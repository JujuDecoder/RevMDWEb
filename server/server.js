import "dotenv/config";
import express from "express";
import cors from "cors";
import dashboardRoutes from "./src/routes/dashboard.js";
import mechanicsRoutes from "./src/routes/mechanics.js";
import usersRoutes from "./src/routes/users.js";



const app = express();

app.use(cors());
app.use(express.json());

// 🔐 Protected routes only
app.use("/api", dashboardRoutes);
app.use("/api/mechanics", mechanicsRoutes);
app.use("/api/users", usersRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
