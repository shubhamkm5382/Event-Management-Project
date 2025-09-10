const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all albums
router.get("/", (req, res) => {
  db.query("SELECT * FROM albums", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Albums fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare albums successfully fetch ho gaye 🎉",
      count: results.length,
      data: results
    });
  });
});

// ✅ Get single album
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM albums WHERE album_id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Album fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Album nahi mila ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Album successfully fetch ho gaya 🎉",
      data: result[0]
    });
  });
});

// ✅ Create album
router.post("/", (req, res) => {
  const { event_id, album_title, album_subtitle, album_description, cover_image } = req.body;
  db.query(
    "INSERT INTO albums (event_id, album_title, album_subtitle, album_description, cover_image) VALUES (?, ?, ?, ?, ?)",
    [event_id, album_title, album_subtitle, album_description, cover_image],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Album create karte waqt error aayi ❌",
          error: err.sqlMessage || err.message
        });
      }

      res.status(201).json({
        isSuccess: true,
        message: "Album successfully create ho gaya 🎉",
        id: result.insertId,
        ...req.body
      });
    }
  );
});

// ✅ Update album
router.put("/:id", (req, res) => {
  const { album_title, album_subtitle, album_description, cover_image } = req.body;
  db.query(
    "UPDATE albums SET album_title=?, album_subtitle=?, album_description=?, cover_image=? WHERE album_id=?",
    [album_title, album_subtitle, album_description, cover_image, req.params.id],
    (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Album update karte waqt error aayi ❌",
          error: err.sqlMessage || err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Album update nahi ho paya, shayad record exist nahi karta ⚠️"
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Album successfully update ho gaya 🎉",
        id: req.params.id,
        ...req.body
      });
    }
  );
});

// ✅ Delete album
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM albums WHERE album_id=?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Album delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Album delete nahi ho paya, record exist nahi karta ⚠️"
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Album successfully delete ho gaya 🎉",
      id: req.params.id
    });
  });
});

module.exports = router;
