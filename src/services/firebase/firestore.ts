import { FIREBASE_CONFIG } from "@/firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp(FIREBASE_CONFIG);

export const firestore = getFirestore(firebase);
export const database = getDatabase(firebase);

export interface FirestoreServiceType {
    [key: string]: Function;
}

const FirestoreService: FirestoreServiceType = {};

export default FirestoreService;