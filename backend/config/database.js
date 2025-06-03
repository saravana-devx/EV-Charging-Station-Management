const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log(`database url : ${process.env.DATABASE_URL}`);
const db = mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error(`error in database connection : ${error.message}`);
  });
