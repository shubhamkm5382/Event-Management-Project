const mysql = require("mysql2");
require("dotenv").config(); // .env file load karega

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Shubham@12",
  database: process.env.DB_NAME || "event_management",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

module.exports = db;
