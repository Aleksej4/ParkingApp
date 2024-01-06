import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCZg01eKD3_EFBMpG_XHf45cRDHsW1g_C4",
    authDomain: "parkingapp-9fab6.firebaseapp.com",
    projectId: "parkingapp-9fab6",
    storageBucket: "parkingapp-9fab6.appspot.com",
    messagingSenderId: "469647657952",
    appId: "1:469647657952:web:3c3397d6fa88e1344b3985",
    measurementId: "G-N8BFZBZQ30"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)