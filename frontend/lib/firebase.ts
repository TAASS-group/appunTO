// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtfthP01EVK-kKnopFtV8muv4tDskq2Vg",
  authDomain: "fir-spike-9db16.firebaseapp.com",
  projectId: "fir-spike-9db16",
  storageBucket: "fir-spike-9db16.appspot.com",
  messagingSenderId: "822451504569",
  appId: "1:822451504569:web:26a1cf2e7d751aa475a268",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, auth, firestore, storage };
