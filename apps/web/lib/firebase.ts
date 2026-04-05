import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const globalForFirebase = globalThis as typeof globalThis & {
  __abtecWebFirebaseApp?: FirebaseApp;
  __abtecWebFirestore?: Firestore;
  __abtecWebAuth?: Auth;
  __abtecWebFirebaseEmulatorsConnected?: boolean;
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getApp(): FirebaseApp {
  const existingApp = globalForFirebase.__abtecWebFirebaseApp;
  if (existingApp) {
    return existingApp;
  }

  const apps = getApps();
  const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0]!;
  globalForFirebase.__abtecWebFirebaseApp = app;
  return app;
}

function connectEmulatorsIfNeeded(db: Firestore, auth: Auth): void {
  if (
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' &&
    !globalForFirebase.__abtecWebFirebaseEmulatorsConnected
  ) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    globalForFirebase.__abtecWebFirebaseEmulatorsConnected = true;
  }
}

export function getClientDb(): Firestore {
  const existingDb = globalForFirebase.__abtecWebFirestore;
  if (existingDb) {
    return existingDb;
  }

  const db = getFirestore(getApp());
  const auth = getClientAuth();
  connectEmulatorsIfNeeded(db, auth);
  globalForFirebase.__abtecWebFirestore = db;
  return db;
}

export function getClientAuth(): Auth {
  const existingAuth = globalForFirebase.__abtecWebAuth;
  if (existingAuth) {
    return existingAuth;
  }

  const auth = getAuth(getApp());
  globalForFirebase.__abtecWebAuth = auth;

  if (globalForFirebase.__abtecWebFirestore) {
    connectEmulatorsIfNeeded(globalForFirebase.__abtecWebFirestore, auth);
  }

  return auth;
}

export function getClientAnalytics() {
  if (!isBrowser()) {
    return null;
  }

  return getAnalytics(getApp());
}
