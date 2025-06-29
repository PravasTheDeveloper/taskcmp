// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy5KewiARL0XDNBF76zrZf9s3-Z5FGxvs",
  authDomain: "cmptask-a130c.firebaseapp.com",
  databaseURL: "https://cmptask-a130c-default-rtdb.firebaseio.com/", // Add your Realtime Database URL
  projectId: "cmptask-a130c",
  storageBucket: "cmptask-a130c.firebasestorage.app",
  messagingSenderId: "41804156662",
  appId: "1:41804156662:web:ce3201e2cc62f9d10ba6d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Export the app for other potential uses
export default app; 