import { createApp } from 'vue'
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAel5n0CeIH2ECAQKS1oBWEKbosX8JW-GY",
    authDomain: "sensor-application-64e59.firebaseapp.com",
    projectId: "sensor-application-64e59",
    storageBucket: "sensor-application-64e59.appspot.com",
    messagingSenderId: "425371988350",
    appId: "1:425371988350:web:3e303fd13f553e5be7832f",
    databaseURL: "https://sensor-application-64e59-default-rtdb.europe-west1.firebasedatabase.app"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app);

createApp(App).mount('#app')