import adminModule from "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";

const admin = adminModule.admin || adminModule;

export async function verifyIdToken(idToken) {
  return admin.auth().verifyIdToken(idToken);
}

export function createAppToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}