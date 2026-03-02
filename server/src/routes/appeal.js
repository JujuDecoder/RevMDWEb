import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

// GET all appeals
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("appeal").get();

    const appeals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(appeals);
  } catch (error) {
    console.error("Error fetching appeals:", error);
    res.status(500).json({ error: "Failed to fetch appeals" });
  }
});

export default router;
