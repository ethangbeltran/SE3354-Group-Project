const express = require('express')
const mysql = require('mysql2')
const session = require('express-session')
const bcrypt = require('bcrypt');
const app = express()
const port = 3000

app.get('/api/stuff', (req, res) => {
	console.log("User used endpoint /api/stuff")

	res.send(JSON.stringify({
		type: 420,
		message: "This is some sample text"
	}))
})

// Maybe move configuration to separate file?
const con = mysql.createConnection({
	host: "localhost",
	user: "username",
	password: "passwd",
	database: "fastsnacks"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.get('/login', (req, res) => {
	res.redirect("login.html")
})

// This middleware is needed to process input from HTML forms
app.use(express.urlencoded())

app.post('/login', async function(req,res) {
	let username = req.body.username;
	let password = req.body.password;
	let passwordHash = await bcrypt.hash(password, 15); // 15 salt rounds
	console.log(`Post attempted, "${username}" "${password}" "${passwordHash}"`);
	var sql = "SELECT username, passwordhash FROM Customer"
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result)
		bcrypt.compare(password, passwordHash, (err, matches) => {
			if (err) throw err;
			if (matches) {
				console.log("match successful")
				// TODO: Create session
			}
		})
	})
	res.redirect("/login.html")
})

app.post('/register', async (req, res) => {
	let username = req.body.email
	let password = req.body.psw
	let passwordHash = await bcrypt.hash(password, 15)
	console.log(`Register attempted, "${username}" "${password}" "${passwordHash}"`)
	var sql = "SELECT username FROM Customer WHERE username = ${username}"
	con.query(sql, (err, result) => {
		// New user, add to database
		if (err) {
			sql = `INSERT INTO Customer (username, passwordHash) VALUES ("${username}", "${passwordHash}")`
			con.query(sql, (err, result) => {
				if (err) throw err
				console.log("New user registered")
				res.redirect("/")
			})
		}
		else {
			console.log(result)
			console.log("User already registered.")
			res.redirect("/register.html")
		}
	})
})

app.use(express.static('public'))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
