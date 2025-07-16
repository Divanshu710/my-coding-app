import { useEffect, useState } from "react";
import { getAllProblems } from "../services/problems";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function ProblemsList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const data = await getAllProblems();
      setProblems(data);
    }
    fetchProblems();
  }, []);

  return (
    <>
    <Header/>
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-3xl mb-6 font-bold">Problems</h1>
      <div className="max-w-3xl mx-auto space-y-2">
        {problems.map((problem, index) => (
          <Link
            key={problem.id}
            to={`/problem/${problem.id}`}
            className="flex justify-between items-center p-3 rounded bg-gray-800 hover:bg-gray-700 transition border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-6 text-center">{index + 1}.</span>
              <h2 className="text-lg font-semibold">{problem.title}</h2>
            </div>
            <p className={`text-sm font-medium ${
              problem.difficulty === "Easy" ? "text-green-400" :
              problem.difficulty === "Medium" ? "text-yellow-400" :
              "text-red-400"
            }`}>
              {problem.difficulty}
            </p>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
