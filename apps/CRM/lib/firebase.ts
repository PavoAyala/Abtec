import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
	type Auth,
	connectAuthEmulator,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from "firebase/auth";
import {
	addDoc,
	collection,
	connectFirestoreEmulator,
	type DocumentData,
	deleteDoc,
	doc,
	type Firestore,
	getDoc,
	getDocs,
	getFirestore,
	onSnapshot,
	orderBy,
	QueryConstraint,
	query,
	Timestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import {
	connectFunctionsEmulator,
	getFunctions,
	httpsCallable,
	type Functions,
} from "firebase/functions";

// Configuración de Firebase - usar variables de entorno en producción
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
	authDomain:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abtec-8f31e",
	storageBucket:
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
		"abtec-8f31e.appspot.com",
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abc123",
};

// Inicializar Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let functions: Functions;
const globalForFirebase = globalThis as typeof globalThis & {
	__abtecCrmFirebaseEmulatorsConnected?: boolean;
};

if (typeof window !== "undefined") {
	app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
	db = getFirestore(app);
	auth = getAuth(app);
	functions = getFunctions(app);

	if (
		process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true" &&
		!globalForFirebase.__abtecCrmFirebaseEmulatorsConnected
	) {
		connectFirestoreEmulator(db, "127.0.0.1", 8080);
		connectAuthEmulator(auth, "http://127.0.0.1:9099");
		connectFunctionsEmulator(functions, "127.0.0.1", 5001);
		console.info(
			"[Firebase][CRM] Usando emuladores: Firestore(8080), Auth(9099), Functions(5001)",
		);
		globalForFirebase.__abtecCrmFirebaseEmulatorsConnected = true;
	}
}

// Funciones de autenticación
export const login = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const register = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Funciones de Firestore genéricas
export const getCollection = async <T>(
	collectionName: string,
	...constraints: QueryConstraint[]
): Promise<T[]> => {
	const q = query(collection(db, collectionName), ...constraints);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
};

export const getDocument = async <T>(
	collectionName: string,
	id: string,
): Promise<T | null> => {
	const docRef = doc(db, collectionName, id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return { id: docSnap.id, ...docSnap.data() } as T;
	}
	return null;
};

export const createDocument = async <T extends DocumentData>(
	collectionName: string,
	data: T,
): Promise<string> => {
	const docRef = await addDoc(collection(db, collectionName), {
		...data,
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
	});
	return docRef.id;
};

export const updateDocument = async <T extends DocumentData>(
	collectionName: string,
	id: string,
	data: Partial<T>,
): Promise<void> => {
	const docRef = doc(db, collectionName, id);
	await updateDoc(docRef, {
		...data,
		updatedAt: Timestamp.now(),
	});
};

export const deleteDocument = async (
	collectionName: string,
	id: string,
): Promise<void> => {
	const docRef = doc(db, collectionName, id);
	await deleteDoc(docRef);
};

export const subscribeToCollection = <T>(
	collectionName: string,
	callback: (data: T[]) => void,
	...constraints: QueryConstraint[]
) => {
	const q = query(collection(db, collectionName), ...constraints);
	return onSnapshot(q, (snapshot) => {
		const data = snapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() }) as T,
		);
		callback(data);
	});
};

// Helper para convertir timestamps de Firestore a Date
export const convertTimestamp = (
	data: Record<string, unknown>,
): Record<string, unknown> => {
	const result = { ...data };
	Object.keys(result).forEach((key) => {
		const value = result[key];
		if (value && typeof value === "object" && "toDate" in value) {
			result[key] = (value as Timestamp).toDate();
		}
	});
	return result;
};

export const callFunction = <TData, TResult>(name: string) =>
	httpsCallable<TData, TResult>(functions, name);

export {
	auth,
	collection,
	db,
	doc,
	orderBy,
	QueryConstraint,
	query,
	Timestamp,
	where,
};
