import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

export const firebaseConfig = {
    apiKey: "AIzaSyAZ8TzfjFhixC9D8kGVQorRInCZoW2RdT0",
    authDomain: "manager-2a479.firebaseapp.com",
    databaseURL: "https://manager-2a479.firebaseio.com",
    projectId: "manager-2a479",
    storageBucket: "manager-2a479.appspot.com",
    messagingSenderId: "664024051082",
    appId: "1:664024051082:web:9c93c7040b550db6776c73"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {
    db, auth
}