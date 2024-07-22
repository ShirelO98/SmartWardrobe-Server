const { createConnection, closeConnection } = require("../db");
async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT id FROM tbl_101_users WHERE user_name = ? AND user_password = ?",
      [username, password]
    );

    await closeConnection();

    if (rows.length === 0) {
      return res.status(401).json({ error: "Wrong User Name or Password" });
    }

    res.json({ UserID: rows[0].user_id, msg: "Login successful" });
  } catch (err) {
    console.error("Failed to login:", err);
    res.status(500).json({ error: "Failed to login" });
  }
}
module.exports = {
  loginUser,
};
