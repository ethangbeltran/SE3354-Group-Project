// As long as any other file references this file as a dependency (such as routes/auth.js), this code will be run.
const Database = require("better-sqlite3");

// [1, 2, 3, 4, 5, 6, 7, 8, 9] --> [[1, 2, 3, 4], [5, 6, 7, 8], [9]]
function paginate() {
  //
}

module.exports = {
  db: new Database(process.env.DATABASE || "main.db"),
  paginate,
};
