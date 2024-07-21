require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const db = require("./db");
async function dbinit() {
  await db.createConnection();
  await db.initialize();
  await db.closeConnection();
}
dbinit();
const { userRouter } = require("./routers/userrouter");

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

app.use("/user", userRouter);

app.listen(port);
console.log(`listening on port ${port}`);
