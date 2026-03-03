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

// UPDATE appeal status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await db.collection("appeal")
      .doc(req.params.id)
      .update({ status });

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ADD message to appeal
router.post("/:id/messages", async (req, res) => {
  try {
    const { sender, text } = req.body;

    const messageRef = await db
      .collection("appeal")
      .doc(req.params.id)
      .collection("messages")
      .add({
        sender,
        text,
        timestamp: new Date(),
      });

    res.status(200).json({ id: messageRef.id });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// GET messages for an appeal
router.get("/:id/messages", async (req, res) => {
  try {
    const snapshot = await db
      .collection("appeal")
      .doc(req.params.id)
      .collection("messages")
      .orderBy("timestamp")
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await db
      .collection("appeal")
      .doc(req.params.id)
      .update({ status });

    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});
export default router;
