// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSD5Mp3RrkJXNXvjeI0Hk9vwNtptq10CQ",
  authDomain: "crown-db-466b0.firebaseapp.com",
  projectId: "crown-db-466b0",
  storageBucket: "crown-db-466b0.appspot.com",
  messagingSenderId: "59200776971",
  appId: "1:59200776971:web:1499f278eeefb6ef7c100e",
  measurementId: "G-6PEK2KB53N"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = doc(db, "users", `${userAuth.uid}`);
  const setRef = collection(db, "users");

  const snapShot = await getDoc(userRef);
   
  if(!snapShot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(setRef, `${userAuth.uid}`),{
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
    console.log('error creating user', error.message);
  }
}
return userRef;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
// export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export default initializeApp;
