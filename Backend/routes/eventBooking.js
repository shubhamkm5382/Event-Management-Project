const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ CREATE Booking (user will send event_type instead of event_id)
router.post("/", (req, res) => {
  const { event_type, user_name, email, mobile_number, event_date, status } = req.body;

  if (!event_type || !user_name || !email || !mobile_number || !event_date) {
    return res.status(400).json({
      isSuccess: false,
      message: "Saare required fields dena zaroori hai ❌",
    });
  }

  // Pehle event_id nikal lo given event_type ke base pe
  const findEventSql = "SELECT event_id FROM events WHERE event_type = ?";

  db.query(findEventSql, [event_type], (err, result) => {
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
        message: `Event type '${event_type}' nahi mila ❌`,
      });
    }

    const event_id = result[0].event_id;

    // Ab booking insert karo
    const insertSql = `
      INSERT INTO event_booking (event_id, user_name, email, mobile_number, event_date, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [event_id, user_name, email, mobile_number, event_date, status || "pending"],
      (err, insertResult) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({
            isSuccess: false,
            message: "Booking create karte waqt error aayi ❌",
            error: err.sqlMessage || err.message,
          });
        }

        res.status(201).json({
          isSuccess: true,
          message: "Booking successfully create ho gaya 🎉",
          booking_id: insertResult.insertId,
        });
      }
    );
  });
});

// ✅ READ All Bookings (with event_type only)
router.get("/", (req, res) => {
  const sql = `
    SELECT b.booking_id, b.user_name, b.email, b.mobile_number, b.event_date, b.status, e.event_type
    FROM event_booking b
    JOIN events e ON b.event_id = e.event_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Bookings fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare bookings successfully fetch ho gaye 🎉",
      count: results.length,
      data: results,
    });
  });
});

// ✅ READ Single Booking by ID (event_type included)
router.get("/:id", (req, res) => {
  const sql = `
    SELECT b.booking_id, b.user_name, b.email, b.mobile_number, b.event_date, b.status, e.event_type
    FROM event_booking b
    JOIN events e ON b.event_id = e.event_id
    WHERE b.booking_id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Booking fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Booking nahi mili ❌",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Booking successfully fetch ho gayi 🎉",
      data: result[0],
    });
  });
});

// ✅ UPDATE Booking (user will send event_type instead of event_id)
router.put("/:id", (req, res) => {
  const { event_type, user_name, email, mobile_number, event_date, status } = req.body;

  if (!event_type || !user_name || !email || !mobile_number || !event_date) {
    return res.status(400).json({
      isSuccess: false,
      message: "Saare required fields dena zaroori hai ❌",
    });
  }

  // Event ID nikalna event_type se
  const findEventSql = "SELECT event_id FROM events WHERE event_type = ?";

  db.query(findEventSql, [event_type], (err, result) => {
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
        message: `Event type '${event_type}' nahi mila ❌`,
      });
    }

    const event_id = result[0].event_id;

    const updateSql = `
      UPDATE event_booking 
      SET event_id=?, user_name=?, email=?, mobile_number=?, event_date=?, status=?
      WHERE booking_id=?
    `;

    db.query(
      updateSql,
      [event_id, user_name, email, mobile_number, event_date, status, req.params.id],
      (err, updateResult) => {
        if (err) {
          console.error("Database update error:", err);
          return res.status(500).json({
            isSuccess: false,
            message: "Booking update karte waqt error aayi ❌",
            error: err.sqlMessage || err.message,
          });
        }

        if (updateResult.affectedRows === 0) {
          return res.status(404).json({
            isSuccess: false,
            message: "Booking nahi mili ❌",
          });
        }

        res.status(200).json({
          isSuccess: true,
          message: "Booking successfully update ho gayi 🎉",
        });
      }
    );
  });
});

// ✅ DELETE Booking
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM event_booking WHERE booking_id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Booking delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Booking nahi mili ❌",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Booking successfully delete ho gayi 🎉",
    });
  });
});

module.exports = router;
