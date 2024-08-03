const { query } = require("../db");

const getAllClients = async (req, res) => {
  const { stylistId } = req.params;
  if (!stylistId) {
    return res.status(404).json({ error: "Not Found" });
  }
  try {
   
    const rows = await query(
      "SELECT u.* FROM tbl_101_users u INNER JOIN tbl_101_stylists s ON u.stylist_id = s.stylist_id WHERE s.client_id = u.id AND s.stylist_id = ?",
      [stylistId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Wardrobes not found" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Failed to get wardrobe:", err);
    res.status(500).json({ error: "Failed to get wardrobe" });
  }
};
module.exports = {
stylistController: {
    getAllClients,
  },
};
