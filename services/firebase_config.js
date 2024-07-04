import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOyC87ESb6u_V_JijKQeNze1LFSdVtgrc",
  authDomain: "calmy-firebase.firebaseapp.com",
  projectId: "calmy-firebase",
  storageBucket: "calmy-firebase.appspot.com",
  messagingSenderId: "236821548324",
  appId: "1:236821548324:web:733dc8fda4d39c6f9537b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth
const auth = getAuth(app);

// Firebase auth
const db = getFirestore(app);


export { app };
export { auth };
export { db };
export { Timestamp };