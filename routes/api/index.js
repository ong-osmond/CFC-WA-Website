const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);

router.use(function(req, res) {
    console.log(`Route is unavailable.`);
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

module.exports = router;
