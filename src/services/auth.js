import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserProfile } from "./userService";
export const signup = async (email, password) => {
    try {
        const usercredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = usercredentials.user;

        // create user profile in Firestore
        const username = user.email.split("@")[0];
        await createUserProfile(user.uid, {
            username: username,
            bio: "",
            education: "",
            location: "",
            rank: 100000,
            skills: [],
            solvedCount: [0, 0, 0],
            solvedQuestions: [],
            avatar: "/collection/document",
            accuracy: 0,
        });

        return {
            message: "success",
            status: 200,
            user: user
        };
    } catch (error) {
        console.log("error during signing up", error);
        throw error;
    }
};


export const login = async(email,password)=>{
    try {
        const usercredentials= await signInWithEmailAndPassword(auth,email,password);
    return {
        message: "success",
        status:200,
        user: usercredentials.user
    }
}
    catch (error) {
         console.log("Error during login",error);
         throw(error);
    }
}
export const logout = async () => {
    try {
        await signOut(auth);
        return {
            message: "logged out",
            status: 200
        };
    } catch (error) {
        console.log("Error during logout", error);
        throw error;
    }
};
