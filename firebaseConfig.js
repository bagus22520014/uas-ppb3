// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOoRKntqesBD6WjagXoHqC_QxiSBv1jK0",
  authDomain: "uas-ppb3.firebaseapp.com",
  projectId: "uas-ppb3",
  storageBucket: "uas-ppb3.firebasestorage.app",
  messagingSenderId: "224320860987",
  appId: "1:224320860987:web:4d4031d2f2259ada85bd1e",
  measurementId: "G-YFKYHJPXF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);