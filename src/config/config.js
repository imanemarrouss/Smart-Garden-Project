// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBuCzn7y-wDu8ceLKWqNrsRV-ruHTQ1UI",
  authDomain: "smart-garden-dc0c4.firebaseapp.com",
  databaseURL: "https://smart-garden-dc0c4-default-rtdb.firebaseio.com",
  projectId: "smart-garden-dc0c4",
  storageBucket: "smart-garden-dc0c4.appspot.com",
  messagingSenderId: "646755395344",
  appId: "1:646755395344:web:ffba9f0af09fc7fc42e795",
  measurementId: "G-80HL368QXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };
