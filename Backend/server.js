const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const mediaRoutes = require("./routes/media");
const eventInfoRoutes = require("./routes/eventInfo");
const subEventRoutes = require("./routes/Sub-Event")
const eventBookingRoutes = require("./routes/eventBooking");
const contactRoutes = require("./routes/contact")

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/event-info", eventInfoRoutes);
app.use("/api/sub-event", subEventRoutes);
app.use("/api/bookings", eventBookingRoutes);
app.use("/api/contact", contactRoutes);


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

