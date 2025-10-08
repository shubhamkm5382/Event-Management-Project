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
    WHERE m.media_id = ?
  `;

  db.query(query, [req.params.id], (err, result) => {
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
// PUT /api/media/:id
// ✅ Update Media by ID (with safe debugging)
router.put("/:id", upload.single("media_file"), (req, res) => {
  const { id } = req.params;
  const {
    event_type,
    media_title,
    media_description,
    media_location,
    media_date,
    media_type,
  } = req.body;

  const media_url = req.file ? `/uploads/${req.file.filename}` : req.body.media_url;

  console.log("🟢 UPDATE Request received for ID:", id);
  console.log("🟡 BODY:", req.body);
  console.log("🟣 FILE:", req.file);

  // Step 1: Find event_id from event_type
  const eventQuery = "SELECT event_id FROM events WHERE event_type = ? LIMIT 1";
  db.query(eventQuery, [event_type], (err, eventResult) => {
    if (err) {
      console.error("❌ Event fetch error:", err);
      return res.status(500).json({
        message: "Database error while fetching event_id",
        error: err.sqlMessage || err.message,
      });
    }

    if (eventResult.length === 0) {
      return res.status(404).json({
        message: `Event type '${event_type}' not found in events table ❌`,
      });
    }

    const event_id = eventResult[0].event_id;
    console.log("✅ Found event_id:", event_id);

    // Step 2: Update query
    const updateSQL = `
      UPDATE media 
      SET 
        event_id = ?, 
        media_type = ?, 
        media_url = ?, 
        media_title = ?, 
        media_description = ?, 
        media_location = ?, 
        media_date = ?
      WHERE media_id = ?
    `;

    const values = [
      event_id,
      media_type,
      media_url,
      media_title,
      media_description,
      media_location,
      media_date,
      id,
    ];

    console.log("🧩 Final SQL values:", values);

    db.query(updateSQL, values, (err, result) => {
      if (err) {
        console.error("❌ SQL Update error:", err);
        return res.status(500).json({
          message: "Error updating media record",
          error: err.sqlMessage || err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No media found with this ID or no changes made ⚠️",
        });
      }

      console.log("✅ Update successful:", result);
      res.status(200).json({
        message: "Media updated successfully ✅",
        updatedId: id,
      });
    });
  });
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
