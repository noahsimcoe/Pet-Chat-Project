// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Xn7M8mm6zs7SZLGQDByoPhWleNr2bJo",
  authDomain: "pet-chat-project.firebaseapp.com",
  projectId: "pet-chat-project",
  storageBucket: "pet-chat-project.appspot.com",
  messagingSenderId: "944337056451",
  appId: "1:944337056451:web:4151f90af3193ce0332876",
  measurementId: "G-0DYHD2EBQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// will allow us to make references to our storage
export const storage = getStorage(app);


