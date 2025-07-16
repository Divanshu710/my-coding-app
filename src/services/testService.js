import { db } from "../config/firebase";
import { getDoc,doc,addDoc,collection } from "firebase/firestore";

export const getProblemById = async (id) => {
  const docRef = doc(db, "problems", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("Problem not found");
  }
  return { id: docSnap.id, ...docSnap.data() };
};

// Create new test
export const createTest = async (problems, timeLimit) => {
  return await addDoc(collection(db, "tests"), {
    problems: problems.map(p => p.id),
    timeLimit: timeLimit,
    created_at: new Date()
  });
};