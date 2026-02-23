import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

// Retrieve mechanic from archive
router.post("/retrieve/:id", async (req, res) => {
  const mechanicId = req.params.id;

  try {
    const archivedDoc = await db.collection("archive").doc(mechanicId).get();

    if (!archivedDoc.exists) {
      return res.status(404).json({
        message: "Archived mechanic not found",
      });
    }

    // restore to mechanics
    await db.collection("mechanics").doc(mechanicId).set(archivedDoc.data());

    // delete from archive
    await db.collection("archive").doc(mechanicId).delete();

    res.status(200).json({
      message: "Mechanic retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
