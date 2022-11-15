const express = require('express')
const mysql = require('mysql2')
const session = require('express-session')
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
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.get('/login', (req, res) => {
	res.redirect("login.html")
})

app.post('/login', function(req,res) {
	//res.status(200).send('You tried')
	console.log(req.body)
	//console.log(res.body)
	//var username = req.body.username
	//var password = req.body.password
	//console.log(username)
	//console.log(password)
	console.log("Post attempted")
	//res.redirect("/login.html")
})

app.post('/register', (req, res, next) => {
	res.status(200).send('You tried')
	console.log(req.body)
})

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.use(express.static('public'))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
