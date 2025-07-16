import { useState } from "react";
import { createSubmission, getSubmissionResult } from "../../services/judge";
import { getAIDebugFeedback, getTimeSpaceComplexity } from "../../services/aidebug";
import Editor from "@monaco-editor/react";

export default function EditorPanel({ problem }) {
  const [code, setCode] = useState("// write your code here");
  const [languageId, setLanguageId] = useState(54); // C++
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugging, setDebugging] = useState(false);
  const [debugOutput, setDebugOutput] = useState("");
  const [showDebug, setShowDebug] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showTCSC, setShowTCSC] = useState(true);
  const [complexityOutput, setComplexityOutput] = useState("");

  const handleRun = async () => {
    setLoading(true);
    try {
      const token = await createSubmission(code, languageId, "");
      let result;
      let tries = 0;
      do {
        await new Promise((r) => setTimeout(r, 1000));
        result = await getSubmissionResult(token);
        tries++;
      } while (result.status.id <= 2 && tries < 10);

      if (result.stdout) setOutput(result.stdout);
      else if (result.stderr) setOutput(result.stderr);
      else if (result.compile_output) setOutput(result.compile_output);
      else setOutput("No output.");
    } catch (err) {
      console.error(err);
      setOutput("Execution error.");
    }
    setLoading(false);
  };

  const handleDebug = async () => {
    setDebugging(true);
    setDebugOutput("Analyzing your code...");
    setShowDebug(true);
    try {
      const result = await getAIDebugFeedback(problem.title, code);
      setDebugOutput(result);
    } catch (err) {
      console.error("AI Debug Error:", err);
      setDebugOutput("Failed to get AI feedback.");
    }
    setDebugging(false);
  };

  const handleComplexity = async () => {
    setAnalyzing(true);
    setComplexityOutput("Analyzing Complexity...");
    setShowTCSC(true);
    try {
      const result = await getTimeSpaceComplexity(problem.title, code);
      setComplexityOutput(result);
    } catch (error) {
      console.error("Error analyzing complexity", error);
      setComplexityOutput("Failed to analyze complexity");
    }
    setAnalyzing(false); // ✅ Fixed here
  };

  return (
    <div>
      <select
        value={languageId}
        onChange={(e) => setLanguageId(Number(e.target.value))}
        className="mb-3 p-2 bg-gray-800 rounded"
      >
        <option value={54}>C++</option>
        <option value={71}>Python</option>
        <option value={62}>Java</option>
        <option value={63}>JavaScript</option>
      </select>

      <div className="mb-4 rounded overflow-hidden border border-gray-700">
        <Editor
          height="400px"
          defaultLanguage="cpp"
          language={getMonacoLanguage(languageId)}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={handleDebug}
          disabled={debugging}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {debugging ? "Debugging..." : "Debug with AI"}
        </button>

        {debugOutput && (
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            {showDebug ? "Hide Debugger" : "Show Debugger"}
          </button>
        )}

        <button
          onClick={handleComplexity}
          disabled={analyzing}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {analyzing ? "Analyzing..." : "Analyze Complexity"}
        </button>

        {complexityOutput && (
          <button
            onClick={() => setShowTCSC(!showTCSC)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            {showTCSC ? "Hide Complexity" : "Show Complexity"}
          </button>
        )}
      </div>

      <div className="mt-4 p-3 bg-black rounded">
        <h2 className="font-semibold mb-2">Output:</h2>
        <pre>{output}</pre>
      </div>

      {debugOutput && showDebug && (
        <div className="mt-4 p-3 bg-gray-800 rounded border border-blue-500">
          <h2 className="font-semibold mb-2 text-blue-400">🧠 AI Debug Suggestions:</h2>
          <pre className="whitespace-pre-wrap">{debugOutput}</pre>
        </div>
      )}

      {complexityOutput && showTCSC && (
        <div className="mt-4 p-3 bg-gray-800 rounded border border-blue-500">
          <h2 className="font-semibold mb-2 text-blue-400">🧠 Complexity Analysis:</h2>
          <pre className="whitespace-pre-wrap">{complexityOutput}</pre>
        </div>
      )}
    </div>
  );
}

// Helper to map Judge0 IDs to Monaco languages
function getMonacoLanguage(languageId) {
  switch (languageId) {
    case 54:
      return "cpp";
    case 71:
      return "python";
    case 62:
      return "java";
    case 63:
      return "javascript";
    default:
      return "cpp";
  }
}
