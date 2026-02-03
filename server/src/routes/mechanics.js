import express from "express";
import admin, { db, auth } from "../config/firebaseAdmin.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { firstName, lastName, email, password, expertise } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 1️⃣ Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // 2️⃣ Save mechanic data in Firestore with role
    const docRef = await db.collection("mechanics").add({
      uid,
      firstName,
      lastName,
      email,
      expertise,
      status: "Active",
      role: "mechanic", // <-- automatically assign role
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      message: "Mechanic account created",
      id: docRef.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET all mechanics
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("mechanics")
      .orderBy("createdAt", "desc")
      .get();

    const mechanics = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt
        ? doc.data().createdAt.toDate().toLocaleString()
        : "",
    }));

    res.status(200).json(mechanics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
