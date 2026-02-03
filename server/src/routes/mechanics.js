import express from "express";
import admin, { db, auth } from "../config/firebaseAdmin.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { firstName, lastName, email, password, expertise } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 1. Create user in Firebase Auth - This part is correct.
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const uid = userRecord.uid; // This is the unique ID we will use.

    // --- THIS IS THE FIX ---

    // 2. Define the document reference using the authentication UID.
    const docRef = db.collection("mechanics").doc(uid);

    // 3. Set the data for that document. Note we no longer need to save the 'uid' inside.
    await docRef.set({
      // We don't need to store 'uid' inside the document anymore,
      // because the document's ID is the UID.
      firstName,
      lastName,
      email,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      status: "Active",
      role: "mechanic",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      // You can add other fields like averageRating: 0 here if you want.
    });

    // --- END OF FIX ---

    res.status(201).json({
      message: "Mechanic account created successfully",
      // We now return the UID as the ID.
      id: uid,
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


// Move mechanic to archive
router.post('/archive/:id', async (req, res) => {
  const mechanicId = req.params.id;

  try {
    const mechanic = await db.collection('mechanics').doc(mechanicId).get();
    if (!mechanic.exists) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    // Move the mechanic to the archive collection
    await db.collection('archive').doc(mechanicId).set(mechanic.data());
    await db.collection('mechanics').doc(mechanicId).delete();

    res.status(200).json({ message: "Mechanic archived successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete mechanic
router.delete('/delete/:id', async (req, res) => {
  const mechanicId = req.params.id;

  try {
    await db.collection('mechanics').doc(mechanicId).delete();
    res.status(200).json({ message: "Mechanic deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get archived mechanics


export default router;
