import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_I,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

console.log(process.env.REACT_APP_FIREBASE_API_KEY)

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const signInAsDemo = async () => {
  let demoUser;
  await signInWithEmailAndPassword(auth, "test@test.com", "testtest").then(
    (user) => {
      demoUser = user.user;
    }
  );
  return demoUser;
};
