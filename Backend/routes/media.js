const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all media
router.get("/", (req, res) => {
  db.query("SELECT * FROM media", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare media records successfully fetch ho gaye 🎉",
      count: results.length,
      data: results
    });
  });
});

// ✅ Get single media
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM media WHERE media_id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Media nahi mila ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Media record successfully fetch ho gaya 🎉",
      data: result[0]
    });
  });
});

// ✅ Create media
router.post("create/", (req, res) => {
  const { event_id, album_id, media_type, media_url, media_title, media_description, media_location } = req.body;
  
  db.query(
    "INSERT INTO media (event_id, album_id, media_type, media_url, media_title, media_description, media_location) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [event_id, album_id, media_type, media_url, media_title, media_description, media_location],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Media save karte waqt error aayi ❌",
          error: err.sqlMessage || err.message
        });
      }
      
      res.status(201).json({
        isSuccess: true,
        message: "Media successfully added 🎉",
        id: result.insertId,
        ...req.body
      });
    }
  );
});

// ✅ Update media
router.put("/:id", (req, res) => {
  const { event_id, album_id, media_type, media_url, media_title, media_description, media_location } = req.body;
  db.query(
    "UPDATE media SET event_id=?, album_id=?, media_type=?, media_url=?, media_title=?, media_description=?, media_location=? WHERE media_id=?",
    [event_id, album_id, media_type, media_url, media_title, media_description, media_location, req.params.id],
    (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Media update karte waqt error aayi ❌",
          error: err.sqlMessage || err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Media update nahi ho paya, shayad record exist nahi karta ⚠️"
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Media successfully update ho gaya 🎉",
        id: req.params.id,
        ...req.body
      });
    }
  );
});

// ✅ Delete media
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM media WHERE media_id=?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Media delete nahi ho paya, record exist nahi karta ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Media successfully delete ho gaya 🎉",
      id: req.params.id
    });
  });
});

router.get("/bookingpage/:type", (req, res) => {
  const eventType = req.params.type;

  const sql = `
    SELECT m.* 
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    WHERE e.event_title = ? 
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

router.get("/:type/:mediaType", (req, res) => {
  const eventType = req.params.type;
  const mediaType = req.params.mediaType;

  const sql = `
    SELECT m.* 
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    WHERE e.event_title = ? 
      AND m.media_type = ?
  `;

  db.query(sql, [eventType, mediaType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result); // sirf wahi media aayega jo match karega
  });
});




module.exports = router;
