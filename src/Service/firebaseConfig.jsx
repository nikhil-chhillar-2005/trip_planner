// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnZRXaTHovn7np_dDq1-cdmOzPCDF2aWA",
  authDomain: "ai-trip-planner-422ab.firebaseapp.com",
  projectId: "ai-trip-planner-422ab",
  storageBucket: "ai-trip-planner-422ab.firebasestorage.app",
  messagingSenderId: "650330030021",
  appId: "1:650330030021:web:fff8bfa147703301ad15ac",
  measurementId: "G-G0H25R8JMQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);