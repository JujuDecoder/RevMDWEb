import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard/auth", verifyToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user.email,
    uid: req.user.uid,
  });
});
export default router;
