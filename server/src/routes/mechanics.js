import express from "express";
import admin, { db, auth } from "../config/firebaseAdmin.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")  // Make sure this is the correct collection
      .orderBy("createdAt", "desc")
      .get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Include the necessary fields like address, firstName, lastName, etc.
      date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleString() : "",
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.post("/create", async (req, res) => {
  const { firstname, lastname, email, password, expertise, averageRating, workingHours, ratingCount } = req.body;

  if (!firstname || !lastname || !email || !password) {
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
      firstname,
      lastname,
      email,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      workingHours: String(workingHours),
      averageRating: Number(averageRating),
      ratingCount: Number(ratingCount),
      status: "Active",
      role: "mechanic",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
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
router.post("/archive/:id", async (req, res) => {
  const mechanicId = req.params.id;

  try {
    const mechanic = await db.collection("mechanics").doc(mechanicId).get();
    if (!mechanic.exists) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    // Move the mechanic to the archive collection
    await db.collection("archive").doc(mechanicId).set(mechanic.data());
    await db.collection("mechanics").doc(mechanicId).delete();

    res.status(200).json({ message: "Mechanic archived successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete mechanic
router.delete("/delete/:id", async (req, res) => {
  const mechanicId = req.params.id;

  try {
    await db.collection("mechanics").doc(mechanicId).delete();
    res.status(200).json({ message: "Mechanic deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/archive", async (req, res) => {
  try {
    const snapshot = await db
      .collection("archive")
      .orderBy("createdAt", "desc")
      .get();

    const archivedMechanics = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt
        ? doc.data().createdAt.toDate().toLocaleString()
        : "",
    }));

    res.status(200).json(archivedMechanics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .orderBy("createdAt", "desc") // optional
      .get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt
        ? doc.data().createdAt.toDate().toLocaleString()
        : "",
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


export default router;
