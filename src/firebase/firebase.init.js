// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-3UbengFmPbOfocQ2eS15sw3h4hykgFY",
  authDomain: "local-food-lover.firebaseapp.com",
  projectId: "local-food-lover",
  storageBucket: "local-food-lover.firebasestorage.app",
  messagingSenderId: "875159307641",
  appId: "1:875159307641:web:d77f8ee1ab74f3bf0d9ba8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);