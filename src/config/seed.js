import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { problems } from "../collections/problems.cllection.js";

const firebaseConfig = {
   apiKey: "AIzaSyCjMqI6dnoxGHddf_7DURYZzOpYCSkwZb8",
  authDomain: "dsa-platform-7078f.firebaseapp.com",
  projectId: "dsa-platform-7078f",
  storageBucket: "dsa-platform-7078f.firebasestorage.app",
  messagingSenderId: "588582683238",
  appId: "1:588582683238:web:465af6b2847d06c7ed23a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  for (const problem of problems) {
    await setDoc(doc(db, "problems", problem.id), problem);
    console.log(`Uploaded problem: ${problem.id}`);
  }
}

seed().then(() => {
  console.log("All problems uploaded!");
  process.exit(0);
});
