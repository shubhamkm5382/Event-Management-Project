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





// 1. GET all events
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// 2. GET single event by ID
app.get("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const sql = "SELECT * FROM events WHERE event_id = ?";
  
  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(results[0]);
  });
});

// 3. CREATE new event
app.post("/events", (req, res) => {
  const { event_name, event_date, organizer, description } = req.body;
  const sql = "INSERT INTO events (event_name, event_date, organizer, description) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [event_name, event_date, organizer, description], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create event" });
    }
    res.status(201).json({ 
      message: "Event created successfully", 
      event_id: result.insertId 
    });
  });
});

// 4. UPDATE event
app.put("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const { event_name, event_date, organizer, description } = req.body;
  const sql = "UPDATE events SET event_name = ?, event_date = ?, organizer = ?, description = ? WHERE event_id = ?";
  
  db.query(sql, [event_name, event_date, organizer, description, eventId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update event" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event updated successfully" });
  });
});

// 5. DELETE event
app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const sql = "DELETE FROM events WHERE event_id = ?";
  
  db.query(sql, [eventId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete event" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  });
});