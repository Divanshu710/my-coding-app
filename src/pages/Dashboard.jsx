import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getAllProblems } from "../services/problems";

const difficultyColors = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [problem, setProblem]= useState([]);

  useEffect(() => {
  async function fetchProblems(){
    const data = await getAllProblems();

    const shuffled = data.sort(() => 0.5 - Math.random());
    // pick first N problems, e.g. 6
    const selected = shuffled.slice(0, 6);
    setProblem(selected);
  }
  fetchProblems();
}, []);

  
  return (
    <>
    <Header/>
    <div className="bg-gray-900 px-8 py-4 flex justify-start items-center">
  <div className="text-xl font-bold text-white"></div>
  <button
    onClick={() => navigate(`/playground`)}
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition"
  >
    🚀 Use Online Compiler
  </button>
  <button
    onClick={() => navigate(`/addproblem`)}
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition mx-10"
  >
    ADD YOUR OWN DSA PROBLEM...
  </button>
  <button
    onClick={() => navigate(`/create-custom-test`)}
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition mx-10"
  >
    CREATE CUSTOM TEST
  </button>
</div>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🚀 Practice DSA Problems</h1>
        <div className="flex justify-end mb-6">
  <button onClick={()=> navigate(`/problems`)}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
  >
    Show All Problems
  </button>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problem.map((problem) => (
  <div
    key={problem.id}
    className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
  >
    <h2 className="text-2xl font-semibold mb-2">{problem.title}</h2>
    <p className={`mb-4 ${difficultyColors[problem.difficulty]}`}>
      {problem.difficulty}
    </p>
    <button
      onClick={() => navigate(`/problem/${problem.id}`)}
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
    >
      Solve Now
    </button>
  </div>
))}

        </div>
      </div>
    </div>
    </>
  );
}
