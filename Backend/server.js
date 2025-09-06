const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const albumRoutes = require("./routes/albums");
const mediaRoutes = require("./routes/media");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/media", mediaRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
