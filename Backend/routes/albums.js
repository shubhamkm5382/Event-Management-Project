const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all albums
router.get("/", (req, res) => {
  db.query("SELECT * FROM albums", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ✅ Get single album
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM albums WHERE album_id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// ✅ Create album
router.post("/", (req, res) => {
  const { event_id, album_title, album_subtitle, album_description, cover_image } = req.body;
  db.query(
    "INSERT INTO albums (event_id, album_title, album_subtitle, album_description, cover_image) VALUES (?, ?, ?, ?, ?)",
    [event_id, album_title, album_subtitle, album_description, cover_image],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// ✅ Update album
router.put("/:id", (req, res) => {
  const { album_title, album_subtitle, album_description, cover_image } = req.body;
  db.query(
    "UPDATE albums SET album_title=?, album_subtitle=?, album_description=?, cover_image=? WHERE album_id=?",
    [album_title, album_subtitle, album_description, cover_image, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Album updated successfully" });
    }
  );
});

// ✅ Delete album
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM albums WHERE album_id=?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Album deleted successfully" });
  });
});

module.exports = router;
