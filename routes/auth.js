const express = require("express");
const bcrypt = require("bcrypt");
const nunjucks = require("nunjucks");
const { db } = require("../util");
const router = express.Router();
module.exports = router;

// This middleware is needed to process input from HTML forms
router.use(express.urlencoded({ extended: true }));

// express-session provides req.session, which is an empty object by default.
// This object is unique for each session, so the same field will contain different values for different users.
// Every browser instances creates a session, whether logged in or not.
// Because of this, logging in simply involves attaching a username to a session (because usernames must be unique).
// To implement logging out, use session.destroy() which will force the user's browser to create a new session afterwards.

router.get("/login", (req, res) => {
  // Redirect the user to the main page if they've already logged in.
  if (req.session.username) {
    return res.redirect("/");
  }

  res.send(
    nunjucks.render("templates/login.njk", {
      username: req.session.username,
      error: req.query.error,
      isRegistrationSuccessful: !!req.query.registration_success,
    })
  );
});

router.get("/register", (req, res) => {
  // Redirect the user to the main page if they've already logged in.
  if (req.session.username) {
    return res.redirect("/");
  }

  res.send(
    nunjucks.render("templates/register.njk", {
      username: req.session.username,
      error: req.query.error,
    })
  );
});

// Error #1: Empty username
// Error #2: Empty password
// Error #3: User doesn't exist
// Error #4: Invalid password
router.post("/login", async (req, res) => {
  // Redirect the user to the main page if they've already logged in.
  if (req.session.username) {
    return res.redirect("/");
  }

  const { username, password } = req.body;

  if (username === "") {
    return res.redirect("/login?error=1");
  }
  if (password === "") {
    return res.redirect("/login?error=2");
  }

  const results = db
    .prepare("SELECT * FROM Customers WHERE Username = ?")
    .get(username);

  // Check if the username exists in the database.
  if (!results) {
    return res.redirect("/login?error=3");
  }

  // There should only be one user per username, meaning this operation should be safe.
  const { Username, PasswordHash } = results;

  const isValidPassword = await bcrypt.compare(password, PasswordHash);

  if (!isValidPassword) {
    return res.redirect("/login?error=4");
  }

  // Once the password is validated, then attach the username to the existing session for easy verification.
  // Note: Use "Username" from the database rather than "req.body.username" because "Username" is case-sensitive while "req.body.username" isn't.
  // This means that for a username "asdf", the user can send "ASDF" as the username and still have it work.
  req.session.username = Username;

  res.redirect("/");
});

// Error #1: Empty username
// Error #2: Empty password
// Error #3: Passwords don't match
// Error #4: Username already taken
router.post("/register", async (req, res) => {
  // Redirect the user to the main page if they've already logged in.
  if (req.session.username) {
    return res.redirect("/");
  }

  const { username, password } = req.body;

  if (username === "") {
    return res.redirect("/register?error=1");
  }
  if (password === "") {
    return res.redirect("/register?error=2");
  }
  if (password !== req.body["password-repeat"]) {
    return res.redirect("/register?error=3");
  }

  const passwordHash = await bcrypt.hash(password, 10); // 10 salt rounds

  // Check if the username already exists in the database, then create if successful.
  const results = db
    .prepare("SELECT * FROM Customers WHERE Username = ?")
    .get(username);

  // If there are any existing results, send back an error
  if (results) {
    return res.redirect("/register?error=4");
  }

  // Simply insert a new row
  db.prepare("INSERT INTO Customers VALUES (?, ?, ?, ?)").run(
    username,
    passwordHash,
    0,
    0
  );

  res.redirect("/login?registration_success=1");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/user-delete", (req, res) => {
  const username = req.session.username;

  // Redirect the user to the main page if they're not logged in.
  if (!username) {
    return res.redirect("/");
  }

  // Delete the user from the database
  db.prepare("DELETE FROM Customers WHERE Username = ?").run(username);

  // Finally, logout and redirect
  req.session.destroy();
  res.redirect("/");
});
