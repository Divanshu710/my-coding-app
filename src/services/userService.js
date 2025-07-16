import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const createUserProfile = async (uid, data) => {
    try {
        await setDoc(doc(db, "users", uid), data);
    } catch (error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
};
export const getUserData = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("No user found");
        }
    } catch (err) {
        console.error("Error fetching user data:", err);
        throw err;
    }
};

