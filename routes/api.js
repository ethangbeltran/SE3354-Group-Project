const express = require("express");
const router = express.Router();
module.exports = router;

router.use(express.json());

router.route("/api/stuff").get((req, res) => {
  console.log("User used endpoint /api/stuff");

  res.send({
    type: 420,
    message: "This is some sample text",
  });
});
