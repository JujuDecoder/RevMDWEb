import "dotenv/config";
import express from "express";
import cors from "cors";
import dashboardRoutes from "./src/routes/dashboard.js";
import mechanicsRoutes from "./src/routes/mechanics.js";
import usersRoutes from "./src/routes/users.js";
import retrieveRoutes from "./src/routes/retrieve.js";
import dashboardRoute from "./src/routes/dashboardcontent.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/mechanics", mechanicsRoutes);
app.use("/api/mechanics", retrieveRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/dashboard", dashboardRoute);   // DATA FIRST
app.use("/api", dashboardRoutes);            // AUTH SECOND

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
