import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboard.js"; // ✅ ADD THIS
import orderRoutes from "./routes/orderRoutes.js";

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
app.use("/api/orders", orderRoutes);

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "DB connected ✅", result: rows[0].result });
  } catch (err) {
    console.error("DB Test Error:", err);
    res.status(500).json({ message: "Database connection failed ❌" });
  }
});

const PORT = process.env.DB_PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});