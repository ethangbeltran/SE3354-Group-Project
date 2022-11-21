// Run dotenv module, this is placed first before any dependencies so there's no chance of a .env variable not showing up when it's supposed to
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const Database = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session); // maintain logins even if the server restarts
const routerGeneral = require("./routes/general");
const routerAuth = require("./routes/auth");
const routerAPI = require("./routes/api");

const app = express();
const port = parseInt(process.env.PORT) || 3000;

// express-session middleware must be placed before routers in order to activate, otherwise req.session will be undefined instead of {}
app.use(
  session({
    store: new SqliteStore({
      client: new Database("sessions.db"),
      expired: {
        clear: true,
        intervalMs: 15 * 60 * 1000, // 15 mins
      },
    }),
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

// Use routes provided by routers
app.use(routerGeneral);
app.use(routerAuth);
app.use(routerAPI);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`FastSnacks server listening on port ${port}.`);
});
