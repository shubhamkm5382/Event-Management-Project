const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all media
router.get("/", (req, res) => {
  db.query("SELECT * FROM media", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ✅ Get single media
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM media WHERE media_id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});



// ✅ Create media
// router.post("/", (req, res) => {
//   const { event_id, album_id, media_type, media_url, media_title, media_description, media_location } = req.body;
//   db.query(
//     "INSERT INTO media (event_id, album_id, media_type, media_url, media_title, media_description, media_location) VALUES (?, ?, ?, ?, ?, ?, ?)",
//     [event_id, album_id, media_type, media_url, media_title, media_description, media_location],
//     (err, result) => {
//       if (err) throw err;
//       res.json({ id: result.insertId, ...req.body });
//     }
//   );
// });

router.post("/", (req, res) => {
  const { event_id, album_id, media_type, media_url, media_title, media_description, media_location } = req.body;
  
  db.query(
    "INSERT INTO media (event_id, album_id, media_type, media_url, media_title, media_description, media_location) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [event_id, album_id, media_type, media_url, media_title, media_description, media_location],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ message: "Media save karte waqt error aayi, please dobara try karein." });
      }
      
      res.status(201).json({
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
    (err) => {
      if (err) throw err;
      res.json({ message: "Media updated successfully" });
    }
  );
});

// ✅ Delete media
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM media WHERE media_id=?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Media deleted successfully" });
  });
});


router.get("/category/:category", (req, res) => {
  db.query(
    "SELECT event_id, album_id, media_type, media_url, media_title, media_description, media_location FROM media WHERE media_type = ?",
    [req.params.category],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(result); // 👈 pura array bhejna
    }
  );
});

// router.get("/bookingpage/:category", (req, res) => { 
//   db.query(
//     "SELECT * FROM media WHERE event_id = ?",
//     [req.params.category],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json(result); // pura array bhejna
//     }
//   );
// });

router.get("/bookingpage/:type", (req, res) => {
  const eventType = req.params.type;

  const sql = `
    SELECT m.* 
    FROM media m
    JOIN events e ON m.event_id = e.event_id
    WHERE e.event_title = ?
  `;

  db.query(sql, [eventType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result); // pura array bhejna
  });
});


module.exports = router;
