const { query } = require("../db");

const getAllClients = async (req, res) => {
  const { stylistID } = req.params;
  if (!stylistID) {
    return res.status(404).json({ error: "Not Found" });
  }
  try {
    const rows = await query(
      "SELECT s.msg_client_to_stylist, select_look, u.id, u.f_name, u.l_name, u.user_type, u.profile_image_url, u.stylist_id, u.client_image FROM tbl_101_users u INNER JOIN tbl_101_stylists s ON u.stylist_id = s.stylist_id WHERE s.client_id = u.id AND s.stylist_id = ?",
      [stylistID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Clients not found" });
    }

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to get wardrobe" });
  }
};

const UpdateLookSendByStylist = async (req, res) => {
  const { lookId } = req.params;
  const { stylistId, clientID } = req.body;
  if (!lookId || !stylistId || !clientID) {
    return res.status(400).json({ error: "Missing Field" });
  }
  try {
    const rows = await query(
      "UPDATE tbl_101_stylists SET select_look = ? WHERE stylist_id = ? AND client_id = ?",
      [lookId, stylistId, clientID]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Look not found" });
    }

    res.json({ message: "Look updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update look" });
  }
};

module.exports = {
  stylistController: {
    getAllClients,
    UpdateLookSendByStylist,
  },
};
