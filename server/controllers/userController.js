const { query } = require("../db");

async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const rows = await query(
      "SELECT id, user_type FROM tbl_101_users WHERE user_name = ? AND user_password = ?",
      [username, password]
    );
    if (rows[0] === undefined) {
      return res.status(401).json({ error: "Wrong User Name or Password" });
    }

    res.json({
      UserID: rows[0].id,
      user_type: rows[0].user_type,
      msg: "Login successful"
    });
  } catch (err) {
    console.error("Failed to login:", err);
    res.status(500).json({ error: "Failed to login" });
  }
}

module.exports = {
  userController: {
    loginUser,
  },
};
