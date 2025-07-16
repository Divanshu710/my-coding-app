import React, { useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



export default function AddProblem() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [examples, setExamples] = useState([{ input: "", output: "" }]);
    const [testcases, setTestcases] = useState([{ input: "", expected_output: "" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const docRef = doc(db, "problems", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setError("Problem with this ID already exists.");
                setLoading(false);
                return;
            }

            await setDoc(docRef, {
                id,
                title,
                description,
                difficulty,
                examples,
                testcases,
                createdAt: serverTimestamp(),
            });

            navigate("/problems");
        } catch (err) {
            console.error(err);
            setError("Failed to add problem: " + err.message);
        }
        setLoading(false);
    };

    const handleExampleChange = (index, field, value) => {
        const updated = [...examples];
        updated[index][field] = value;
        setExamples(updated);
    };

    const handleTestcaseChange = (index, field, value) => {
        const updated = [...testcases];
        updated[index][field] = value;
        setTestcases(updated);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex justify-center p-6">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold mb-4">Add New DSA Problem</h1>
                {error && <p className="text-red-400">{error}</p>}

                <div>
                    <label className="block mb-1">Problem ID (unique)</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600" required />
                </div>

                <div>
                    <label className="block mb-1">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600" required />
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600" rows="3" required />
                </div>

                <div>
                    <label className="block mb-1">Difficulty</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Examples</label>
                    {examples.map((ex, index) => (
                        <div key={index} className="space-y-2 mb-4 bg-gray-700 p-3 rounded">
                            <input type="text" placeholder="Input" value={ex.input}
                                onChange={(e) => handleExampleChange(index, "input", e.target.value)}
                                className="w-full p-2 rounded bg-gray-600 border border-gray-500"
                            />
                            <input type="text" placeholder="Output" value={ex.output}
                                onChange={(e) => handleExampleChange(index, "output", e.target.value)}
                                className="w-full p-2 rounded bg-gray-600 border border-gray-500"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setExamples([...examples, { input: "", output: "" }])}
                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">
                        + Add Example
                    </button>
                </div>

                <div>
                    <label className="block mb-2">Test Cases</label>
                    {testcases.map((tc, index) => (
                        <div key={index} className="space-y-2 mb-4 bg-gray-700 p-3 rounded">
                            <input type="text" placeholder="Input" value={tc.input}
                                onChange={(e) => handleTestcaseChange(index, "input", e.target.value)}
                                className="w-full p-2 rounded bg-gray-600 border border-gray-500"
                            />
                            <input type="text" placeholder="Expected Output" value={tc.expected_output}
                                onChange={(e) => handleTestcaseChange(index, "expected_output", e.target.value)}
                                className="w-full p-2 rounded bg-gray-600 border border-gray-500"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setTestcases([...testcases, { input: "", expected_output: "" }])}
                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">
                        + Add Test Case
                    </button>
                </div>

                <button type="submit" disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-xl">
                    {loading ? "Adding..." : "Add Problem"}
                </button>
            </form>
        </div>
    );
}
