import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Editor from "@monaco-editor/react";
import { createSubmission, getSubmissionResult } from "../services/judge";

export default function TestPage() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // Compiler state
  const [codeMap, setCodeMap] = useState({});
  const [outputMap, setOutputMap] = useState({});
  const [running, setRunning] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const testRef = doc(db, "tests", testId);
        const testSnap = await getDoc(testRef);
        if (testSnap.exists()) {
          const testData = testSnap.data();
          setTest(testData);

          // Set initial timer from Firestore
          const seconds = (testData.timeLimit || 30) * 60;
          setTimeLeft(seconds);

          const probs = await Promise.all(
            (testData.problems || []).map(async (pid) => {
              const pRef = doc(db, "problems", pid);
              const pSnap = await getDoc(pRef);
              return pSnap.exists() ? { id: pSnap.id, ...pSnap.data() } : null;
            })
          );
          setProblems(probs.filter(Boolean));
        }
      } catch (err) {
        console.error("Error fetching test:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (started && timeLeft > 0 && !finished) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0 && started) {
      setFinished(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft, finished]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const runCode = async (problemId) => {
    if (finished) return;
    setRunning((prev) => ({ ...prev, [problemId]: true }));
    try {
      const token = await createSubmission(codeMap[problemId] || "", 54, "");
      let result;
      while (true) {
        result = await getSubmissionResult(token);
        if (result.status && result.status.id >= 3) break;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      const output = result.stdout || result.stderr || "No output.";
      setOutputMap((prev) => ({ ...prev, [problemId]: output }));
    } catch (err) {
      console.error(err);
      setOutputMap((prev) => ({ ...prev, [problemId]: "Error running code." }));
    } finally {
      setRunning((prev) => ({ ...prev, [problemId]: false }));
    }
  };

  const completeTest = () => {
    setFinished(true);
    setStarted(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading test...</div>;
  }

  if (!test) {
    return <div className="p-8 text-center text-red-600">Test not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 relative">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 relative">
        {/* Timer and Complete Button always top right */}
        {started && !finished && (
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <div className="text-xl font-semibold text-gray-800">
              ⏳ {formatTime(timeLeft)}
            </div>
            <button
              onClick={completeTest}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              Complete Test
            </button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-center">Test</h1>

        {!started && !finished && (
          <div className="text-center">
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
            >
              Start Test
            </button>
          </div>
        )}

        {finished && (
          <div className="text-center text-2xl text-green-600 font-bold mb-6">
            ✅ Test completed.
          </div>
        )}

        {started && (
          <div className="mt-6 space-y-8">
            {problems.map((problem, idx) => (
              <div key={problem.id} className="p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">
                  {idx + 1}. {problem.title}
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">
                  {problem.description}
                </p>
                 {problem.examples && problem.examples.length > 0 && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Examples:</h3>
        <div className="space-y-2">
          {problem.examples.map((ex, exIdx) => (
            <div key={exIdx} className="bg-gray-200 p-3 rounded">
              <div><strong>Input:</strong> <pre className="inline whitespace-pre-wrap">{ex.input}</pre></div>
              <div><strong>Output:</strong> <pre className="inline whitespace-pre-wrap">{ex.output}</pre></div>
            </div>
          ))}
        </div>
      </div>
    )}

                <Editor
                  height="200px"
                  defaultLanguage="cpp"
                  value={codeMap[problem.id] || ""}
                  onChange={(value) =>
                    setCodeMap((prev) => ({ ...prev, [problem.id]: value }))
                  }
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                  }}
                />

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => runCode(problem.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                    disabled={running[problem.id] || finished}
                  >
                    {running[problem.id] ? "Running..." : "Run Code"}
                  </button>
                </div>

                <div className="mt-4 bg-black text-green-400 p-3 rounded-lg overflow-auto max-h-48">
                  <pre>{outputMap[problem.id] || "// Output will appear here"}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
