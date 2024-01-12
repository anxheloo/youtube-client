// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import env from "react-dotenv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "app-login-with.firebaseapp.com",
  projectId: "app-login-with",
  storageBucket: "app-login-with.appspot.com",
  messagingSenderId: "804290673032",
  appId: "1:804290673032:web:7e07a9c57c178573f5a23d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;

//1.To use Sign in with Google we first open Firebase
//2.Create a Project , in our case we dont need any analitycs
//3.Create Project
//4.Go go to Build - Authentication - Google Provider - Ennable Google - Choose our Email adress - Save
//5.We install google Firebase - npm install firebase
//6.We go to Project Overview - we Choose Web - Give it a name - Copy the code we get - create a file in our project and paste it
//7. It is suggested to put the API KEY in a dotenv file : npm i react-dotenv - create .env file - import env from "react-dotenv"; - check documentation for more
//8.import {getAuth,GoogleAuthProvider} from "firebase/auth",  the provider allows us to use the google button
//9. We import: import { auth, provider } from "../firebase"; to our login page
//10.We import : import {signInWithPopup} from "firebase/auth"; in order to show the google popup when we login
//11.We create the signInWithGoogle function onClick event in the button, and from: https://firebase.google.com/docs/auth/web/google-signin
