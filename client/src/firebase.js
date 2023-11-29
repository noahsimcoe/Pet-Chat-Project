import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4Xn7M8mm6zs7SZLGQDByoPhWleNr2bJo",
  authDomain: "pet-chat-project.firebaseapp.com",
  projectId: "pet-chat-project",
  storageBucket: "pet-chat-project.appspot.com",
  messagingSenderId: "944337056451",
  appId: "1:944337056451:web:4151f90af3193ce0332876",
  measurementId: "G-0DYHD2EBQD",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
