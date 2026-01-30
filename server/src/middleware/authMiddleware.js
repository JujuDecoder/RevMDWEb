import admin from "../config/firebaseAdmin.js";
import { db } from "../config/firebaseAdmin.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;

    const adminDoc = await db.collection("admins").doc(decoded.uid).get();

    if (!adminDoc.exists) {
      return res.status(403).json({ message: "Not an admin" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
