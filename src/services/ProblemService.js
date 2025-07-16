import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";


export const addProblem = async(problemData)=>{
    try {
        const docRef= await addDoc(collection(db,"problems"),{
            ...problemData,
                createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("error adding problem",error);
        throw error;
    }
};