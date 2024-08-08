const { query } = require("../db");

async function loginUser(req, res) {
  let rows2;
  let wardrobecode
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
    if (rows[0].user_type === 1) {
      wardrobecode = await query(
        "SELECT wardrobe_code from tbl_101_looks WHERE look_id = ?",
        [rows[0].id]);
    }

    res.json({
      UserID: rows[0].id,
      user_type: rows[0].user_type,
      userFirstName: rows[0].f_name,
      userLastName: rows[0].l_name,
      userImgUrl: rows[0].profile_image_url,
      selectedLook: rows2[0].select_look,
      messegeFromStylist: rows2[0].msg_stylist_to_client,
      wardrobeCode: wardrobecode[0].wardrobe_code,
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
