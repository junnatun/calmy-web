import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase_config.js";

export async function createDoc(col, docID, data) {
  try {
    const docRef = docID ? doc(collection(db, col), docID) : doc(collection(db, col));

    await setDoc(docRef, data);
    console.log("Document written with ID: ", docRef.id);

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function readDocs(col) {
  try {
    const querySnapshot = await getDocs(collection(db, col));
    return querySnapshot;
  } catch (e) {
    console.error("Error reading documents: ", e);
  }
}

export async function readDocsWithQuery(col, key, value) {
  try {
    const querySnapshot = await getDocs(query(collection(db, col), where(key, '==', value)));
    return querySnapshot;
  } catch (e) {
    console.error("Error reading documents: ", e);
  }
}

export async function readDoc(col, docRef) {
  try {
    const docSnap = await getDoc(doc(db, col, docRef));
    return docSnap;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

