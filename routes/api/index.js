const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const eventRoutes = require("./events");
const memberRoutes = require("./members");
const postRoutes = require("./posts")

// User Route
router.use("/users", userRoutes);
// Event Route
router.use("/events", eventRoutes);
// Post Route
router.use("/posts", postRoutes);
// Member Info Route
router.use("/members", memberRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log(`Route is unavailable.`);
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
