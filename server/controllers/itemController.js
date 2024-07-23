const { query } = require("../db");

const getAllItems = async (req, res) => {
  const { wardrobeCode } = req.params;
  if (!wardrobeCode) {
    return res.status(400).json({ error: "Missing Field" });
  }
  try {
    const rows = await query('SELECT * FROM tbl_101_item where wardrobe_code=?', [wardrobeCode]);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Items", err);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getFilteredItems = async (req, res) => {
  const { wardrobeCode, filter } = req.params;

  if (!wardrobeCode || !filter) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const sql = `
        SELECT * FROM tbl_101_item
        WHERE wardrobe_code = ? AND item_type = ?
      `;
    const rows = await query(sql, [wardrobeCode, filter]);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching filtered items:", err);
    res.status(500).json({ error: "Database query failed" });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  if (!itemId) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const sql = `delete from tbl_101_item where id =?`;
    const result = await query(sql, [item_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item successfully deleted" });
  } catch {
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = {
  itemController: {
    getAllItems,
    getFilteredItems,
    deleteItem,
  },
};
