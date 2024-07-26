const { query } = require("../db");

async function createWardrobe(req, res) {
  const { wardrobeName } = req.body;
  const {userId}=rq.params
  if (!wardrobeName ||!userId) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const rows = await query(
      "INSERT INTO tbl_101_wardrobes_of_user (user_id, wardrobe_name, items, looks) VALUES (?, ?, ?, ?)",
      [userId, wardrobeName, 0, 0]
    );

    res.json({ wardrobeCode: rows.insertId, msg: "Wardrobe created" });
  } catch (err) {
    console.error("Failed to create wardrobe:", err);
    res.status(500).json({ error: "Failed to create wardrobe" });
  }
}

async function getWardrobe(req, res) {
  console.log(`${req}`);
  const { wardrobeCode } = req.params;
  if (!wardrobeCode) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const rows = await query(
      "SELECT * FROM tbl_101_wardrobes_of_user WHERE wardrobe_code = ?",
      [wardrobeCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Wardrobe not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to get wardrobe:", err);
    res.status(500).json({ error: "Failed to get wardrobe" });
  }
}
async function getAllUserWardrobes(req, res) {
  console.log("hi");
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const rows = await query(
      "SELECT * FROM tbl_101_wardrobes_of_user WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Wardrobes not found" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Failed to get wardrobe:", err);
    res.status(500).json({ error: "Failed to get wardrobe" });
  }
}
async function updateWardrobeName(req, res) {
  const { wardrobeCode } = req.params;
  const { wardrobeName } = req.body;
  if (!wardrobeCode || !wardrobeName) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const result = await query(
      "UPDATE tbl_101_wardrobes_of_user SET wardrobe_name = ? WHERE wardrobe_code = ?",
      [wardrobeName, wardrobeCode]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Wardrobe not found" });
    }
    res.json({ msg: "Wardrobe name updated" });
  } catch (err) {
    console.error("Failed to update wardrobe name:", err);
    res.status(500).json({ error: "Failed to update wardrobe name" });
  }
}

async function deleteWardrobe(req, res) {
  const { wardrobeCode } = req.params;
  if (!wardrobeCode) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const result = await query(
      "DELETE FROM tbl_101_wardrobes_of_user WHERE wardrobe_code = ?",
      [wardrobeCode]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Wardrobe not found" });
    }

    res.json({ msg: "Wardrobe deleted" });
  } catch (err) {
    console.error("Failed to delete wardrobe:", err);
    res.status(500).json({ error: "Failed to delete wardrobe" });
  }
}

module.exports = {
  wardrobesController: {
    createWardrobe,
    getWardrobe,
    updateWardrobeName,
    deleteWardrobe,
    getAllUserWardrobes,
  },
};
