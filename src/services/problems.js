import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";


export async function getAllProblems() {
  try {
    const snapshot = await getDocs(collection(db, "problems"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching problems:", error);
    return []; // return empty array to avoid crashing
  }
}
