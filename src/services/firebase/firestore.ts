import { FIREBASE_CONFIG } from "@/firebase-config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp(FIREBASE_CONFIG);

export const firestore = getFirestore(firebase);

export interface FirestoreServiceType {
    [key: string]: Function;
}

const FirestoreService: FirestoreServiceType = {};

export default FirestoreService;