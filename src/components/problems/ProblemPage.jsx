import { useState } from "react";
import { createSubmission, getSubmissionResult } from "../../services/judge";
import Editor from "@monaco-editor/react";

export default function ProblemPage() {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [languageId, setLanguageId] = useState(54);

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
      else setOutput("No output received.");
    } catch (err) {
      console.error(err);
      setOutput("Error executing code.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-3xl mb-6 font-bold">Practice Playground</h1>
      <select
        className="mb-4 p-2 bg-gray-700 rounded"
        value={languageId}
        onChange={(e) => setLanguageId(Number(e.target.value))}
      >
        <option value={71}>Python 3</option>
        <option value={54}>C++</option>
        <option value={62}>Java</option>
        <option value={63}>JavaScript</option>
      </select>

      <div className="mb-4 h-[400px] rounded overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="cpp"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      </div>

      <button
        onClick={handleRun}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      <div className="mt-6 p-4 bg-black rounded max-w-4xl">
        <h2 className="font-bold mb-2">Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
