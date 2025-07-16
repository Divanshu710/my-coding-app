import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { createTest } from "../services/testService";

export default function CreateTest() {
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [testLink,setTestLink]= useState("");

  const handleRemoveProblem = (id) => {
  setSelectedProblems(selectedProblems.filter(p => p.id !== id));
};

  useEffect(() => {
    const fetchProblems = async () => {
      const querySnapshot = await getDocs(collection(db, "problems"));
      let problems = [];
      querySnapshot.forEach(doc => {
        problems.push({ id: doc.id, ...doc.data() });
      });
      setAllProblems(problems);
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    if (searchId.trim() === "") {
      setFilteredProblems([]);
    } else {
      setFilteredProblems(
        allProblems.filter(p =>
          p.id.toLowerCase().includes(searchId.trim().toLowerCase())
        )
      );
    }
  }, [searchId, allProblems]);

  const handleAddProblem = (problem) => {
    if (!selectedProblems.some(p => p.id === problem.id)) {
      setSelectedProblems([...selectedProblems, problem]);
      setError("");
    } else {
      setError("Problem already added.");
    }
  };

 const handleCreateTest = async () => {
  if (selectedProblems.length === 0) {
    setError("Please add at least one problem.");
    return;
  }
  try {
    const docRef = await createTest(selectedProblems, timeLimit);
    const link = `${window.location.origin}/test/${docRef.id}`;
    setTestLink(link);
    setSuccessMsg("Test created successfully!");
    setSelectedProblems([]);
    setSearchId("");
    setTimeLimit(30);
    setFilteredProblems([]);
    setError("");
  } catch (err) {
    console.error(err);
    setError("Failed to create test.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Custom Test</h1>

        {successMsg && <p className="text-green-600 mb-4 text-center">{successMsg}</p>}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Search Problem ID</label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type to search..."
          />
          {filteredProblems.length > 0 && (
            <div className="mt-2 bg-gray-50 rounded border border-gray-300 max-h-60 overflow-y-auto">
              {filteredProblems.map((p) => (
                <div
                  key={p.id}
                  className="p-2 hover:bg-blue-100 cursor-pointer rounded"
                  onClick={() => handleAddProblem(p)}
                >
                  {p.id}: {p.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
  <label className="block mb-2 text-lg font-semibold">Selected Problems:</label>
  {selectedProblems.length === 0 && <p className="text-gray-500">No problems selected.</p>}
  <ul className="space-y-2">
    {selectedProblems.map((p) => (
      <li key={p.id} className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded p-2">
        <span>{p.id}: {p.title}</span>
        <button
          onClick={() => handleRemoveProblem(p.id)}
          className="text-red-600 hover:text-red-800 font-bold"
        >
          ✕
        </button>
      </li>
    ))}
  </ul>
</div>


        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Time Limit (mins):</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="w-32 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-center">
  <button
    onClick={handleCreateTest}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
  >
    Create Test
  </button>

  {testLink && (
    <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700 inline-block">
      <p className="text-green-400 mb-2">Test created successfully!</p>
      <div className="flex items-center justify-center gap-3">
        <input
          type="text"
          value={testLink}
          readOnly
          className="bg-gray-700 text-white px-3 py-2 rounded w-72"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(testLink);
            alert("Link copied to clipboard!");
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Copy Link
        </button>
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
}
