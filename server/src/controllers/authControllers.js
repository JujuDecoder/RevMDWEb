import adminModule from "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!idToken) return res.status(401).json({ message: "No token" });
  try {
    const decoded = await adminModule.admin.auth().verifyIdToken(idToken);
    const token = jwt.sign({ uid: decoded.uid, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};s