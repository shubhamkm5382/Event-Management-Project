const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// 📂 Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files uploads folder me jayengi
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

/* ===========================================================
   ✅ Get all media with event_type
   =========================================================== */
router.get("/", (req, res) => {
  const query = `
    SELECT 
      m.media_id,
      m.media_type,
      m.media_url,
      m.media_title,
      m.media_description,
      m.media_location,
      m.media_date,
      e.event_type
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    ORDER BY m.media_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare media records successfully fetch ho gaye 🎉",
      count: results.length,
      data: results,
    });
  });
});

/* ===========================================================
   ✅ Get single media
   =========================================================== */
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM media WHERE media_id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Media nahi mila ⚠️",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Media record successfully fetch ho gaya 🎉",
      data: result[0],
    });
  });
});

/* ===========================================================
   ✅ Create media (with file or URL)
   =========================================================== */
// ✅ Create media (with file or URL)
router.post("/create", upload.array("media_files"), (req, res) => {
  console.log("👉 BODY:", req.body);
  console.log("👉 FILES:", req.files);

  const { event_type, media_type, media_title, media_description, media_location } = req.body;

  let media_urls = [];

  // Files
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      media_urls.push(`/uploads/${file.filename}`);
    });
  }

  // URLs
  if (req.body.media_urls || req.body["media_urls[]"]) {
    const urls = req.body.media_urls || req.body["media_urls[]"];
    if (Array.isArray(urls)) {
      media_urls.push(...urls);
    } else {
      media_urls.push(urls);
    }
  }

  // Validation
  if (!event_type || !media_type || media_urls.length === 0) {
    return res.status(400).json({
      isSuccess: false,
      message: "event_type, media_type aur media_url required fields hain ❌",
      debug: { body: req.body, files: req.files } // 🐞 Debugging
    });
  }

  // 🔍 Event_id from event_type
  db.query("SELECT event_id FROM events WHERE event_type = ? LIMIT 1", [event_type], (err, results) => {
    if (err) {
      return res.status(500).json({ isSuccess: false, message: "Event find karte waqt error aayi ❌", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ isSuccess: false, message: `Event type '${event_type}' ke liye koi event nahi mila ❌` });
    }

    const event_id = results[0].event_id;

    // ✅ Multiple insert
    const values = media_urls.map((url) => [
      event_id,
      media_type,
      url,
      media_title,
      media_description,
      media_location,
    ]);

    db.query(
      "INSERT INTO media (event_id, media_type, media_url, media_title, media_description, media_location) VALUES ?",
      [values],
      (err, result) => {
        if (err) {
          return res.status(500).json({ isSuccess: false, message: "Media save karte waqt error aayi ❌", error: err });
        }

        res.status(201).json({
          isSuccess: true,
          message: "Media successfully added 🎉",
          count: result.affectedRows,
          media_urls,
        });
      }
    );
  });
});



/* ===========================================================
   ✅ Update media
   =========================================================== */
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
          error: err.sqlMessage || err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Media update nahi ho paya, shayad record exist nahi karta ⚠️",
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Media successfully update ho gaya 🎉",
        id: req.params.id,
        ...req.body,
      });
    }
  );
});

/* ===========================================================
   ✅ Delete media
   =========================================================== */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM media WHERE media_id=?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Media delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Media delete nahi ho paya, record exist nahi karta ⚠️",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Media successfully delete ho gaya 🎉",
      id: req.params.id,
    });
  });
});

/* ===========================================================
   ✅ Media by event type (Booking Page)
   =========================================================== */
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

/* ===========================================================
   ✅ Media by event type + media type
   =========================================================== */
router.get("/:type/:mediaType", (req, res) => {
  const eventType = req.params.type;
  const mediaType = req.params.mediaType;

  const sql = `
    SELECT m.* 
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    WHERE e.event_type = ? 
      AND m.media_type = ?
  `;

  db.query(sql, [eventType, mediaType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

module.exports = router;
