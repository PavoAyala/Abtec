import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadContractPDF = async (
	file: File,
	clientId: string,
): Promise<string> => {
	const timestamp = new Date().getTime();
	const filename = `${clientId}-${timestamp}-${file.name}`;
	const storageRef = ref(storage, `contracts/${filename}`);

	const snapshot = await uploadBytes(storageRef, file);
	const downloadURL = await getDownloadURL(snapshot.ref);

	return downloadURL;
};
