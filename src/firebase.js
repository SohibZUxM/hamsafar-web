import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const readFirebaseEnv = (baseKey) =>
  import.meta.env[`VITE_FIREBASE_${baseKey}`] ||
  import.meta.env[`VITE_PUBLIC_FIREBASE_${baseKey}`] ||
  "";

const requiredEnvVars = [
  "API_KEY",
  "AUTH_DOMAIN",
  "PROJECT_ID",
  "STORAGE_BUCKET",
  "MESSAGING_SENDER_ID",
  "APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((key) => !readFirebaseEnv(key));

const firebaseConfig = {
  apiKey: readFirebaseEnv("API_KEY"),
  authDomain: readFirebaseEnv("AUTH_DOMAIN"),
  projectId: readFirebaseEnv("PROJECT_ID"),
  storageBucket: readFirebaseEnv("STORAGE_BUCKET"),
  messagingSenderId: readFirebaseEnv("MESSAGING_SENDER_ID"),
  appId: readFirebaseEnv("APP_ID"),
  measurementId:
    readFirebaseEnv("MEASUREMENT_ID") ||
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseConfigError =
  missingEnvVars.length > 0
    ? `Missing Firebase environment variables: ${missingEnvVars
        .map((key) => `VITE_FIREBASE_${key} or VITE_PUBLIC_FIREBASE_${key}`)
        .join(", ")}`
    : null;

const app = firebaseConfigError ? null : initializeApp(firebaseConfig);

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export default app;
