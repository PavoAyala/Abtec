import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof globalThis.window !== 'undefined' ? getAnalytics(app) : null;
const globalForFirebase = globalThis as typeof globalThis & {
  __abtecWebFirebaseEmulatorsConnected?: boolean;
};
const shouldUseEmulators =
  typeof globalThis.window !== 'undefined' &&
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';

if (shouldUseEmulators && !globalForFirebase.__abtecWebFirebaseEmulatorsConnected) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  globalForFirebase.__abtecWebFirebaseEmulatorsConnected = true;
}

export { app, analytics, auth, db };
