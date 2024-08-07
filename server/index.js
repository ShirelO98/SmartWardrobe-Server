require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const db = require("./db");
db.dbinit();


// Import routes
const { userRouter } = require("./routers/users-router");
const { wardrobesRouter } = require("./routers/wardrobes-router");
const { itemRouter } = require("./routers/item-router");
const { lookRouter } = require("./routers/look-router");
const { stylistRouter } = require("./routers/stylist-router");
const { weatherRouter } = require("./routers/weather-router");

app.use("/assets/items", express.static(__dirname + "/assets/items"));
app.use("/assets/users", express.static(__dirname + "/assets/users"));
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
app.use("/wardrobe", wardrobesRouter);
app.use("/items", itemRouter);
app.use("/looks", lookRouter);
app.use("/stylist", stylistRouter);
app.use("/weather", weatherRouter);

app.listen(port);
console.log(`listening on port ${port}`);
