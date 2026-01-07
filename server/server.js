import express from "express";
import cors from "cors";
import loginRoutes from "./src/routes/login.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", loginRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
