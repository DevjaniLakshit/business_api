import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT COUNT(*) AS totalProducts FROM products"
    );

    const [orders] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    const [revenue] = await db.query(
      "SELECT IFNULL(SUM(total_amount),0) AS totalRevenue FROM orders"
    );

    res.json({
      totalProducts: products[0].totalProducts,
      totalOrders: orders[0].totalOrders,
      totalRevenue: revenue[0].totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;