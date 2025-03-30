const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

PORT=8080;

/////////////////////////////////////////////
// connect to db

let db;
(async () => {
	db = await open({
		filename: 'midterm.sqlite',
		driver: sqlite3.Database
	});
})();

/////////////////////////////////////////////
// express and middleware setup

app = express();

// support POST data encodings
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

/////////////////////////////////////////////
// routes
app.get('/midterm', async (req, res) => {
	const results = await db.all('SELECT text FROM words');

	res.render('midterm', { words: results});

});

app.get('/instructors', async (req, res) =>{
	const result = await
})

/////////////////////////////////////////////
// start up server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
