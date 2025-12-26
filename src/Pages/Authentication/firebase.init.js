// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwmSySHvl8l36KMhN9vywqZxtKkYNhcaI",
  authDomain: "my-coffee-9129e.firebaseapp.com",
  projectId: "my-coffee-9129e",
  storageBucket: "my-coffee-9129e.firebasestorage.app",
  messagingSenderId: "807537090232",
  appId: "1:807537090232:web:0cff198533b4be7b429e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);