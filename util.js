// The latest SQL script, i.e. "sql/1.sql", "sql/2.sql", etc.
const CURRENT_VERSION = 0;

// As long as any other file references this file as a dependency (such as routes/auth.js), this code will be run.
const Database = require("better-sqlite3");
const fs = require("fs");
const db = new Database(process.env.DATABASE || "main.db");
let version = db.pragma("user_version", { simple: true });

// The user_version pragma starts at zero if uninitialized.
// Loop through files in the "sql" folder, version 0 will run "sql/0.sql", version 1 will run "sql/1.sql", and so on.
for (; version <= CURRENT_VERSION; version++) {
  console.log(`Currently running migration for database version ${version}.`);
  const script = fs.readFileSync(`sql/${version}.sql`, { encoding: "utf-8" });
  db.exec(script);
}

// Set the version after it iterated through all previous versions.
db.pragma(`user_version = ${version}`);

// [1, 2, 3, 4, 5, 6, 7, 8, 9] --> [[1, 2, 3, 4], [5, 6, 7, 8], [9]]
function paginate() {
  //
}

module.exports = {
  db,
  paginate,
};
