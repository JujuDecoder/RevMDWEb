import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // 🔥 FAST COUNT QUERIES (no document download)
    const usersSnap = await db
      .collection("users")
      .where("role", "==", "user")
      .count()
      .get();

    const mechanicsSnap = await db
      .collection("mechanics")
      .where("role", "==", "mechanic")
      .count()
      .get();

    const usersCount = usersSnap.data().count;
    const mechanicsCount = mechanicsSnap.data().count;

    // ✅ Send response to dashboard
    const data = {
      usersActive: usersCount,
      usersAll: usersCount,

      mechanicsActive: mechanicsCount,
      mechanicsAll: mechanicsCount,

      // placeholders so UI doesn't crash
      premiumActive: 0,
      premiumAll: 0,

      appeals: 0,
      appealsChange: "0",
      appealsSparkline: [0, 0, 0, 0, 0, 0, 0],

      reports: 0,
      reportsChange: "0",
      reportsSparkline: [0, 0, 0, 0, 0, 0, 0],
    };

    res.json(data);
  } catch (error) {
    console.error("Dashboard error:", error);
    console.log("Dashboard route HIT");
console.log("Users:", usersCount);
console.log("Mechanics:", mechanicsCount);
console.log("🔥 DASHBOARD DATA ROUTE HIT");
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;