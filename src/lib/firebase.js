// IMPORT THE FUNCTIONS YOU NEED FROM THE SDK'S YOU NEED
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: ADD SDK FOR FIREBASE PRODUCTS THAT YOU WANT TO USE
import { getFirestore } from "firebase/firestore";

// YOUR WEB APP'S FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBNdd9LYKyS0FZY6aaipGHII-iEC5Ev8Xw",
  authDomain: "influencer-bot-386816.firebaseapp.com",
  projectId: "influencer-bot-386816",
  storageBucket: "influencer-bot-386816.appspot.com",
  messagingSenderId: "542979142113",
  appId: "1:542979142113:web:c7a5a7c79c9af3782a62a0",
  measurementId: "G-1NN62E85GQ"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
