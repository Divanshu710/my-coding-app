import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import ProblemDescription from "../components/editor/ProblemDescription";
import EditorPanel from "../components/editor/EditorPanel";
import Header from "../components/Header";
export default function ProblemPage() {
  const { id } = useParams(); // from /problem/:id
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      const docRef = doc(db, "problems", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProblem(docSnap.data());
      }
    }
    fetchProblem();
  }, [id]);

  if (!problem) return <div className="text-white p-4">Loading...</div>;

  return (
    <>
    <Header/>
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-1/2 p-6 border-r border-gray-700 overflow-y-auto">
        <ProblemDescription problem={problem} />
      </div>
      <div className="w-1/2 p-6">
        <EditorPanel problem={problem} />
      </div>
    </div>
    </>
  );
} 
