import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAVOwIetMkirgzjVYYdKAT19C_lMUBS5_s",
  authDomain: "social-media-clone-277a6.firebaseapp.com",
  projectId: "social-media-clone-277a6",
  storageBucket: "social-media-clone-277a6.appspot.com",
  messagingSenderId: "413486263040",
  appId: "1:413486263040:web:4ab650ab01f08ec8a361e5",
});

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
