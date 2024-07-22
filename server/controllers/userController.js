const db = require("../db");


async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const connection = await db.createConnection();
    const [rows] = await connection.execute(
      "SELECT user_id FROM tbl_101_users WHERE username = ? AND password = ?",
      [username, password]
    );
    await db.closeConnection();

    if (rows.length === 0) {
      return res.status(401).json({ error: "Wrong User Name or Password" });
    }
   

    res.json({ "User ID": rows[0].user_id });
  } catch (err) {
    console.error("Failed to login:", err);
    res.status(500).json({ error: "Failed to login" });
  }
}
module.exports = {
  loginUser,
};
