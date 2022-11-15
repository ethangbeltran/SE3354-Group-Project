// As long as any other file references this file as a dependency (such as routes/auth.js), this code will be run.
const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "username",
  password: process.env.MYSQL_PASS ?? "password", // only coerce to default value if env variable is null or undefined to allow for empty strings
  database: "fastsnacks",
  //multipleStatements: true, // allow reading of SQL files
});

// Every module that calls this module must await the connection first
module.exports = connection;
