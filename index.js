const express = require('express')
const app = express()
const port = 3000

app.get('/api/stuff', (req, res) => {
	console.log("User used endpoint /api/stuff")

	res.send(JSON.stringify({
		type: 420,
		message: "This is some sample text"
	}))
})

app.use(express.static('public'))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
