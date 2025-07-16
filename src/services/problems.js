import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";


export async function getAllProblems(){
    const snapshot = await getDocs(collection(db,"problems"));
    return snapshot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }))
}