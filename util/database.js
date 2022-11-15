const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "username",
  password: process.env.MYSQL_PASS || "passwd",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
