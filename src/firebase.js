// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp0KyBRa4VLYaIX6TnoDRXQgKYo0Q-CA0",
  authDomain: "user-reg-authn.firebaseapp.com",
  projectId: "user-reg-authn",
  storageBucket: "user-reg-authn.appspot.com",
  messagingSenderId: "684580252721",
  appId: "1:684580252721:web:d05a62c8ffdd7e5ef87910",
  measurementId: "G-HZ5Q8E6B4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}

