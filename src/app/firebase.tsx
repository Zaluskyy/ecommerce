import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA8FaTQTRxfltDCHvsh-F-kyIqAN18k8x8",
  authDomain: "ecommerce-9e9ae.firebaseapp.com",
  projectId: "ecommerce-9e9ae",
  storageBucket: "ecommerce-9e9ae.appspot.com",
  messagingSenderId: "582828449286",
  appId: "1:582828449286:web:8fce696aab2d7a65c32d87",
  measurementId: "G-WQCHE6FV9M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
// export const storage = getStorage(app)