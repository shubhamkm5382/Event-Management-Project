const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all event_info
router.get("/", (req, res) => {
  db.query("SELECT * FROM event_info", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Event Info fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare event_info records successfully fetch ho gaye 🎉",
      count: results.length,
      data: results
    });
  });
});

// ✅ Get single event_info
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM event_info WHERE event_info_id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Event Info fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Event Info nahi mila ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Event Info record successfully fetch ho gaya 🎉",
      data: result[0]
    });
  });
});

// ✅ Create event_info
router.post("/create", (req, res) => {
  const { event_id, title, location, guests, date_info, price, description, amenities, themes, packages } = req.body;

  const sql = `
    INSERT INTO event_info 
    (event_id, title, location, guests, date_info, price, description, amenities, themes, packages) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    event_id, title, location, guests, date_info, price,
    description, JSON.stringify(amenities), JSON.stringify(themes), JSON.stringify(packages)
  ], (err, result) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Event Info save karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    res.status(201).json({
      isSuccess: true,
      message: "Event Info successfully added 🎉",
      id: result.insertId,
      ...req.body
    });
  });
});

// ✅ Update event_info
router.put("/:id", (req, res) => {
  const { event_id, title, location, guests, date_info, price, description, amenities, themes, packages } = req.body;

  const sql = `
    UPDATE event_info 
    SET event_id=?, title=?, location=?, guests=?, date_info=?, price=?, description=?, amenities=?, themes=?, packages=?
    WHERE event_info_id=?
  `;

  db.query(sql, [
    event_id, title, location, guests, date_info, price,
    description, JSON.stringify(amenities), JSON.stringify(themes), JSON.stringify(packages),
    req.params.id
  ], (err, result) => {
    if (err) {
      console.error("Database update error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Event Info update karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Event Info update nahi ho paya, shayad record exist nahi karta ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Event Info successfully update ho gaya 🎉",
      id: req.params.id,
      ...req.body
    });
  });
});

// ✅ Delete event_info
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM event_info WHERE event_info_id=?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Event Info delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Event Info delete nahi ho paya, record exist nahi karta ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Event Info successfully delete ho gaya 🎉",
      id: req.params.id
    });
  });
});

// ✅ Get event_info by event_type
router.get("/by-type/:type", (req, res) => {
  const eventType = req.params.type;

  const sql = `
    SELECT ei.*
    FROM event_info ei
    JOIN events e ON ei.event_id = e.event_id
    WHERE e.event_type = ?
  `;

  db.query(sql, [eventType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});


router.get("/bookingpage/:type", (req, res) => {
  const eventType = req.params.type;

  const sql = `
    SELECT m.* 
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    WHERE e.event_type = ? 
      AND m.media_type = 'photo'
  `;

  db.query(sql, [eventType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});


module.exports = router;
