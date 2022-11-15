const express = require("express");
const nunjucks = require("nunjucks");
const fs = require("fs/promises");
const router = express.Router();
module.exports = router;

// [TODO] Modularize nunjucks render by adding callback, /login and /register redirect to home page.

function mirrorTemplate(slug) {
  router.get(`/${slug}`, (req, res) => {
    res.send(nunjucks.render(`templates/${slug}.njk`, {username: req.session.username}));
  });
}

// Mirror all templates in "templates" folder except "base.njk" and "example.njk".
fs.readdir("templates").then((files) => {
  files = files.filter(
    (filename) => filename !== "base.njk" && filename !== "example.njk"
  );

  for (let filename of files) {
    // Remove extension from each filename
    filename = filename.substring(0, filename.lastIndexOf("."));
    // Then register the filename (w/o extension) with the server
    mirrorTemplate(filename);
  }
});

// An extra route is needed for the base URL.
router.get("/", async (req, res) => {
  res.send(nunjucks.render("templates/index.njk", {username: req.session.username}));
});
