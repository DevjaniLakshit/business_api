import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboard.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node + MySQL Backend Running 🚀");
});

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ Now it works

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});