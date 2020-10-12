const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const eventRoutes = require("./events");

// User Route
router.use("/users", userRoutes);
// User Route
router.use("/events", eventRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log(`Route is unavailable.`);
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
