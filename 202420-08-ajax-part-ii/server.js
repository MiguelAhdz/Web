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
		filename: 'quotes.sqlite',
		driver: sqlite3.Database
	});
})();

/////////////////////////////////////////////
// express and middleware setup

app = express();

// encoding for form POSTs
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'static')));

/////////////////////////////////////////////
// routes
app.get('/quotes', async (req, res) => {
	const result = await db.all('SELECT * FROM quotes');
	res.json(result);
});

app.post('/quote_search', async (req, res) => {
	const searchTerm = req.body.searchTerm || '';
	const result = await db.all('SELECT * FROM quotes WHERE text LIKE ?', [`%${searchTerm}%`]);
	res.json(result);
});

app.get('/delete/:id', async (req, res) => {
	const quoteId = parseInt(req.params.id);
	try {
		await db.run('DELETE FROM quotes WHERE id = ?', [quoteId]);
		res.status(200).send('Quote deleted successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

/////////////////////////////////////////////
// start up server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));