const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all events
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ✅ Get single event
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM events WHERE event_id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// ✅ Create event
router.post("/", (req, res) => {
  const { event_title, event_subtitle, event_description, cover_image } = req.body;
  db.query(
    "INSERT INTO events (event_title, event_subtitle, event_description, cover_image) VALUES (?, ?, ?, ?)",
    [event_title, event_subtitle, event_description, cover_image],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// ✅ Update event
router.put("/:id", (req, res) => {
  const { event_title, event_subtitle, event_description, cover_image } = req.body;
  db.query(
    "UPDATE events SET event_title=?, event_subtitle=?, event_description=?, cover_image=? WHERE event_id=?",
    [event_title, event_subtitle, event_description, cover_image, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Event updated successfully" });
    }
  );
});

// ✅ Delete event
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM events WHERE event_id=?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Event deleted successfully" });
  });
});

module.exports = router;
