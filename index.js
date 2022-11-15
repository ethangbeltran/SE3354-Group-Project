const express = require("express");
const session = require("express-session");
const routerGeneral = require("./routes/general");
const routerAuth = require("./routes/auth");
const routerAPI = require("./routes/api");

// Run dotenv module
require("dotenv").config();
// Run the code in database.js
require("./util/database");

const app = express();
const port = parseInt(process.env.PORT) || 3000;

// Use routes provided by routers.
app.use(routerGeneral);
app.use(routerAuth);
app.use(routerAPI);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`FastSnacks server listening on port ${port}.`);
});
