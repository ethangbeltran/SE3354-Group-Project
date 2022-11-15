const express = require("express");
const router = express.Router();
module.exports = router;

router.use(express.json());

router.route("/api").get((req, res) => {
  res.json({ version: 1 });
});

router
  .route("/api/stuff")
  .get((req, res) => {
    console.log("User used endpoint /api/stuff");

    res.json({
      type: 420,
      message: "This is some sample text",
    });
  })
  .post((req, res) => {
    console.log(req.body);
  });
