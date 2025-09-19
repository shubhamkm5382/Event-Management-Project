const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ GET all sub-events (with event_type)
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      se.sub_event_id,
      se.name,
      se.img,
      se.tagline,
      e.event_type
    FROM sub_event se
    JOIN events e ON se.event_id = e.event_id
    ORDER BY se.sub_event_id ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching sub-events:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// ✅ GET single sub-event by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      se.sub_event_id,
      se.name,
      se.img,
      se.tagline,
      e.event_type
    FROM sub_event se
    JOIN events e ON se.event_id = e.event_id
    WHERE se.sub_event_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Sub-event not found" });

    res.json(results[0]);
  });
});


// ✅ CREATE new sub-event
// यहाँ आपको "event_type" पास करना होगा, हम उसे event_id में convert करेंगे
router.post("/", (req, res) => {
  const { name, img, tagline, event_type } = req.body;

  if (!name || !event_type) {
    return res.status(400).json({ error: "Name and event_type are required" });
  }

  // पहले event_type से event_id लेंगे
  const getEventId = `SELECT event_id FROM events WHERE event_type = ? LIMIT 1`;

  db.query(getEventId, [event_type], (err, eventResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (eventResult.length === 0) return res.status(400).json({ error: "Invalid event_type" });

    const event_id = eventResult[0].event_id;

    const insertSql = `INSERT INTO sub_event (name, img, tagline, event_id) VALUES (?, ?, ?, ?)`;
    db.query(insertSql, [name, img, tagline, event_id], (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to create sub-event" });

      res.status(201).json({ message: "Sub-event created", sub_event_id: result.insertId });
    });
  });
});


// ✅ UPDATE sub-event
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, img, tagline, event_type } = req.body;

  // पहले event_type को event_id में बदलना होगा
  const getEventId = `SELECT event_id FROM events WHERE event_type = ? LIMIT 1`;

  db.query(getEventId, [event_type], (err, eventResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (eventResult.length === 0) return res.status(400).json({ error: "Invalid event_type" });

    const event_id = eventResult[0].event_id;

    const updateSql = `
      UPDATE sub_event 
      SET name = ?, img = ?, tagline = ?, event_id = ? 
      WHERE sub_event_id = ?
    `;
    db.query(updateSql, [name, img, tagline, event_id, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to update sub-event" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Sub-event not found" });

      res.json({ message: "Sub-event updated" });
    });
  });
});


// ✅ DELETE sub-event
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM sub_event WHERE sub_event_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete sub-event" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Sub-event not found" });

    res.json({ message: "Sub-event deleted" });
  });
});


module.exports = router;
