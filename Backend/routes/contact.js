const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all contacts
router.get("/", (req, res) => {
  db.query("SELECT * FROM contact ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Contacts fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Saare contacts successfully fetch ho gaye 🎉",
      count: results.length,
      data: results,
    });
  });
});

// ✅ Get single contact by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM contact WHERE contact_id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Contact fetch karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Contact nahi mila ⚠️",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Contact successfully fetch ho gaya 🎉",
      data: results[0],
    });
  });
});

// ✅ Create new contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      isSuccess: false,
      message: "Name, Email aur Message required hai ❌",
    });
  }

  db.query(
    "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Contact save karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      res.status(201).json({
        isSuccess: true,
        message: "Contact successfully save ho gaya 🎉",
        data: { contact_id: result.insertId, name, email, message },
      });
    }
  );
});

// ✅ Update contact
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  db.query(
    "UPDATE contact SET name = ?, email = ?, message = ? WHERE contact_id = ?",
    [name, email, message, id],
    (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({
          isSuccess: false,
          message: "Contact update karte waqt error aayi ❌",
          error: err.sqlMessage || err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          isSuccess: false,
          message: "Contact nahi mila ⚠️",
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Contact successfully update ho gaya 🎉",
      });
    }
  );
});

// ✅ Delete contact
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM contact WHERE contact_id = ?", [id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({
        isSuccess: false,
        message: "Contact delete karte waqt error aayi ❌",
        error: err.sqlMessage || err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Contact nahi mila ⚠️",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Contact successfully delete ho gaya 🗑️",
    });
  });
});

module.exports = router;
