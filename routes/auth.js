const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
module.exports = router;

// This middleware is needed to process input from HTML forms
router.use(express.urlencoded());

router.post("/login", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let passwordHash = await bcrypt.compare(password, ""); // retrieve from database
  console.log(`Post attempted, "${username}" "${password}" "${passwordHash}"`);
  res.redirect("/login");
});

router.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let passwordHash = await bcrypt.hash(password, 15); // 15 salt rounds
  console.log(`Post attempted, "${username}" "${password}" "${passwordHash}"`);
  res.redirect("/login");
});
