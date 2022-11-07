const express = require('express')
const mysql = require('mysql');
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

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.use(express.static('public'))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
