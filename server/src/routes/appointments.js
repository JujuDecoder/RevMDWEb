import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

/* GET all appointments */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();

    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

export default router;