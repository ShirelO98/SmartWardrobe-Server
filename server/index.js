require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const db = require("./db");
<<<<<<< HEAD
//db.dbinit();
const { userRouter } = require("./routers/userrouter");
const { wardrobesRouter } = require("./routers/wardrobesRouter");
=======
db.dbinit();

// Import routes
const { userRouter } = require("./routers/users-router");
const { wardrobeRouter } = require("./routers/wardrobe-router");


>>>>>>> d80d7b4d037202a4d32c1d71ada5c9940c266667
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Content-Type", "application/json");
  next();
});

// Routes
app.use("/user", userRouter);
<<<<<<< HEAD
app.use("/wardrobes",wardrobesRouter);
=======
app.use("/wardrobe", wardrobeRouter);
>>>>>>> d80d7b4d037202a4d32c1d71ada5c9940c266667


app.listen(port);
console.log(`listening on port ${port}`);
