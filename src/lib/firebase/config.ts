import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, connectFirestoreEmulator } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-peter-cat-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-peter-cat.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-peter-cat",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-peter-cat.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:petercatkolkata",
};

// Initialize Firebase app singleton
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore singleton instance
export const db: Firestore = getFirestore(app);

// Connect to Firestore emulator if emulator host is configured
if (typeof process !== "undefined" && process.env.FIRESTORE_EMULATOR_HOST) {
  try {
    const hostPort = process.env.FIRESTORE_EMULATOR_HOST;
    const [host, port] = hostPort.split(":");
    connectFirestoreEmulator(db, host || "127.0.0.1", Number(port) || 8080);
  } catch {
    // Ignore reconnect errors in fast refresh / SSR re-evaluations
  }
}
