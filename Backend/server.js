const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 420;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Shubham@12",
  database: "event_management",
  port: 3306,
});

// check mysql connection errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
