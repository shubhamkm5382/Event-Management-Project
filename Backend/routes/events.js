const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all events
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Events fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare events successfully fetch ho gaye 🎉",
      count: results.length,
      data: results,
    });
  });
});

// ✅ Get single event
// router.get("/:id", (req, res) => {
//   db.query(
//     "SELECT * FROM events WHERE event_id = ?",
//     [req.params.id],
//     (err, result) => {
//       if (err) {
//         console.error("Database fetch error:", err);
//         return res.status(500).json({
//           isSuccess: false,
//           message: "Event fetch karte waqt error aayi ❌",
//           error: err.sqlMessage || err.message,
//         });
//       }

//       if (result.length === 0) {
//         return res.status(404).json({
//           isSuccess: false,
//           message: "Event nahi mila ⚠️",
//         });
//       }

//       res.status(200).json({
//         isSuccess: true,
//         message: "Event successfully fetch ho gaya 🎉",
//         data: result[0],
//       });
//     }
//   );
// });

// ✅ Create event
router.post("/", (req, res) => {
  const { event_type, event_title, event_description, cover_image } =
    req.body;
  db.query(
    "INSERT INTO events (event_type, event_title, event_description, cover_image) VALUES (?, ?, ?, ?)",
    [event_type, event_title, event_description, cover_image],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Event create karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      res.status(201).json({
        isSuccess: true,
        message: "Event successfully create ho gaya 🎉",
        id: result.insertId,
        ...req.body,
      });
    }
  );
});

// ✅ Update event
router.put("/:id", (req, res) => {
  const { event_type, event_title, event_description, cover_image } =
    req.body;
  db.query(
    "UPDATE events SET event_type=?, event_title=?, event_description=?, cover_image=? WHERE event_id=?",
    [
      event_type,
      event_title,
      event_description,
      cover_image,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Event update karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message:
            "Event update nahi ho paya, shayad record exist nahi karta ⚠️",
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Event successfully update ho gaya 🎉",
        id: req.params.id,
        ...req.body,
      });
    }
  );
});

// ✅ Delete event
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM events WHERE event_id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error("Database delete error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Event delete karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Event delete nahi ho paya, record exist nahi karta ⚠️",
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Event successfully delete ho gaya 🎉",
        id: req.params.id,
      });
    }
  );
});

router.get("/cover_section/:type", (req, res) => {
  db.query(
    "SELECT * FROM events WHERE event_type = ?",
    [req.params.type],
    (err, result) => {
      if (err) {
        console.error("Database fetch error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Event fetch karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Event nahi mila ⚠️ IIIIIIIIIIIII",
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Event successfully fetch ho gaya 🎉",
        data: result[0],
      });
    }
  );
});

module.exports = router;
