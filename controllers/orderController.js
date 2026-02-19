import db from "../db.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      address,
      payment_method,
      items,
      total_amount,
    } = req.body;

    console.log("BODY:", req.body);

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const [orderResult] = await db.query(
      "INSERT INTO orders (customer_name, phone, address, payment_method, total_amount) VALUES (?, ?, ?, ?, ?)",
      [customer_name, phone, address, payment_method, total_amount]
    );

    const orderId = orderResult.insertId;

    for (let item of items) {
      let cleanPrice = parseFloat(
        item.price?.toString().replace(/[^0-9.]/g, "")
      );

      if (isNaN(cleanPrice)) cleanPrice = 0; // ✅ prevent crash

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id || null, item.quantity || 1, cleanPrice]
      );
    }

    res.json({
      message: "Order Created ✅",
      orderId,
    });
  } catch (error) {
    console.error("❌ ORDER ERROR:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT * FROM orders ORDER BY created_at DESC
    `);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
