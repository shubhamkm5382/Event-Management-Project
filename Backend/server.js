const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const mediaRoutes = require("./routes/media");
const eventInfoRoutes = require("./routes/eventInfo");
const subEventRoutes = require("./routes/Sub-Event")

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/event-info", eventInfoRoutes);
app.use("/api/sub-event", subEventRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost/:${PORT}`);
});
