const mysql = require("mysql2");
import '../Backend/.env'

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Shubham@12" || DB_PASSWORD,
  database: "event_management", // apna DB name
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

module.exports = db;
