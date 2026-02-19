import db from "../db.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  const { customer_name, phone, address, paymentMethod, cart, totalAmount } = req.body;

  try {
    // Insert order
    const [orderResult] = await db.query(
      "INSERT INTO orders (name, phone, address, payment_method, total_amount) VALUES (?, ?, ?, ?, ?)",
      [customer_name, phone, address, paymentMethod, totalAmount]
    );

    const orderId = orderResult.insertId;

    // Insert items
    for (let item of cart) {
      const cleanPrice = parseFloat(
        item.price.toString().replace(/[^0-9.]/g, "")
      );

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.quantity, cleanPrice]
      );
    }

    res.json({
      message: "Order Created ✅",
      orderId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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