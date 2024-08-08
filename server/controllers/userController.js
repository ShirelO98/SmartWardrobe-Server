const { query } = require("../db");

async function loginUser(req, res) {
  let rows2;
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing Field" });
  }

  try {
    const rows = await query(
      "SELECT * FROM tbl_101_users WHERE user_name = ? AND user_password = ?",
      [username, password]
    );
    if (rows[0] === undefined) {
      return res.status(401).json({ error: "Wrong User Name or Password" });
    }
    if (rows[0].user_type === 1) {
      rows2 = await query(
        "SELECT * from tbl_101_stylists WHERE client_id = ?",
        [rows[0].id]);
    }
    res.json({
      UserID: rows[0].id,
      user_type: rows[0].user_type,
      userFirstName: rows[0].f_name,
      userLastName: rows[0].l_name,
      userImgUrl: rows[0].profile_image_url,
      selectedLook: rows2[0].select_look,
      msg: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
}

module.exports = {
  userController: {
    loginUser,
  },
};
