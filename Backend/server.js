const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const mediaRoutes = require("./routes/media");
const eventInfoRoutes = require("./routes/eventInfo");
const subEventRoutes = require("./routes/Sub-Event");
const eventBookingRoutes = require("./routes/eventBooking");
const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());

// ✅ Ye zaroor add karo (form-data ke liye required hai)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/event-info", eventInfoRoutes);
app.use("/api/sub-event", subEventRoutes);
app.use("/api/bookings", eventBookingRoutes);
app.use("/api/contact", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
