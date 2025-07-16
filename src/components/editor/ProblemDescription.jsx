export default function ProblemDescription({ problem }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <p className="mb-4">{problem.description}</p>
      {problem.examples && (
        <div>
          <h2 className="font-semibold mb-2">Examples:</h2>
          {problem.examples.map((ex, i) => (
            <div key={i} className="mb-2 bg-gray-800 p-3 rounded">
              <div><strong>Input:</strong> {ex.input}</div>
              <div><strong>Output:</strong> {ex.output}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
