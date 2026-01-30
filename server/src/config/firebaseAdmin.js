import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export default admin;
