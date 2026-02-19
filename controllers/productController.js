import db from "../db.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const { name, description, price, category, weight } = req.body;

  // ✅ get image from multer
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await db.query(
      "INSERT INTO products (name, description, price, category, weight, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, category, weight, image],
    );

    res.json({ message: "Product Created ✅" });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product Deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
