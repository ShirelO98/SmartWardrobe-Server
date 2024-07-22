const mysql = require("mysql2/promise");
let connection;

const createConnection = async () => {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

  });
  return connection;
};

const initialize = async () => {
  if (connection) {
    await connection.execute(`
      CREATE TABLE if not exists tbl_101_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        f_name VARCHAR(255) NOT NULL,
        l_name VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) UNIQUE,
        user_password INT NOT NULL
      ); 
    `);
    await connection.execute(`
      CREATE TABLE if not exists tbl_101_wardrobes_of_user (
        wardrobe_code INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        wardrobe_name VARCHAR(255) NOT NULL,
        items INT NOT NULL,
        looks INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES tbl_101_users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      );
    `);
    await connection.execute(`
      CREATE TABLE if not exists tbl_101_item (
        id INT AUTO_INCREMENT PRIMARY KEY,
        wardrobe_code INT NOT NULL,
        item_status BOOLEAN NOT NULL,
        item_name VARCHAR(255) NOT NULL,
        item_color VARCHAR(255) NOT NULL,
        item_type VARCHAR(255) NOT NULL, 
	      item_season VARCHAR(255) NOT NULL,
        item_size VARCHAR(255) NOT NULL, 
        item_img VARCHAR(500) NOT NULL,
        FOREIGN KEY (wardrobe_code) REFERENCES tbl_101_wardrobes_of_user(wardrobe_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      );
    `);
    await connection.execute(`
      CREATE TABLE if not exists tbl_101_looks (
        look_id INT AUTO_INCREMENT PRIMARY KEY,
        item_id_1 INT NOT NULL,
        item_id_2 INT NOT NULL,
        item_id_3 INT NOT NULL,
        look_status BOOLEAN,
        FOREIGN KEY (item_id_1) REFERENCES tbl_101_item(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        FOREIGN KEY (item_id_2) REFERENCES tbl_101_item(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        FOREIGN KEY (item_id_3) REFERENCES tbl_101_item(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      );
  `);
  }
};

const closeConnection = async () => {
  if (connection) {
    await connection.end();
  }
};

const dbinit = async () => {
  await db.createConnection();
  await db.initialize();
  await db.closeConnection();
};

module.exports = {
  closeConnection,
  initialize,
  createConnection,
  dbinit,
};
