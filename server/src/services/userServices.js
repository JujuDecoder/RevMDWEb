import { db } from "../config/firebaseAdmin.js";

export const getUsers = async () => {
  const snapshot = await db.collection("sers").get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addUser = async (userData) => {
  const ref = await db.collection("adminUsers").add(userData);
  return ref.id;
};
