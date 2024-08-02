const { query } = require("../db");

const ITEM_TYPE = {
  0: "All",
  1: "Shirt",
  2: "Pants",
  3: "Shoes",
};
const updateStatus = async (req, res) => {
  const { itemId } = req.params;

  if (!itemId) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const result = await query(
      `update tbl_101_item set item_status = 1-item_status where id=?`,
      [itemId]
    );
    const result2 = await query(`
      UPDATE tbl_101_looks l
    LEFT JOIN tbl_101_item i1 ON l.item_id_1 = i1.id
    LEFT JOIN tbl_101_item i2 ON l.item_id_2 = i2.id
    LEFT JOIN tbl_101_item i3 ON l.item_id_3 = i3.id
    SET l.look_status = CASE
      WHEN (i1.item_status = 1 OR i1.item_status IS NULL)
    AND (i2.item_status = 1 OR i2.item_status IS NULL)
    AND (i3.item_status = 1 OR i3.item_status IS NULL)
    THEN 1
    ELSE 0
    END
    WHERE l.item_id_1 = ? 
    OR l.item_id_2 = ? 
    OR l.item_id_3 = ?;`, [itemId, itemId, itemId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item successfully updated" });
  } catch {
    res.status(500).json({ error: "Database query failed" });
  }
};

const getAllItems = async (req, res) => {
  const { wardrobeCode } = req.params;
  if (!wardrobeCode) {
    return res.status(400).json({ error: "Missing Field" });
  }
  try {
    const rows = await query(
      "SELECT * FROM tbl_101_item where wardrobe_code=?",
      [wardrobeCode]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Items not found" });
    }
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
  const itemType = ITEM_TYPE[filter];
  if (!itemType) {
    return res.status(400).json({ error: "Invalid filter value" });
  }
  try {
    const rows = await query(
      `
        SELECT * FROM tbl_101_item
        WHERE wardrobe_code = ? AND item_type = ?
      `,
      [wardrobeCode, itemType]
    );

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
    const result = await query(`delete from tbl_101_item where id =?`, [
      itemId,
    ]);
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
    updateStatus,
  },
};
