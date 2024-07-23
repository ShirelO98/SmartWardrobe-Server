require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const db = require("./db");
db.dbinit();

// Import routes
const { userRouter } = require("./routers/users-router");
const { wardrobesRouter } = require("./routers/wardrobes-router");
const {itemRouter}=require("./routers/item-router");

app.use("/assets/items", express.static('items')); 
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
app.use("/items",itemRouter);


app.listen(port);
console.log(`listening on port ${port}`);
