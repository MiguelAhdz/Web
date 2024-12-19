const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'db.sqlite3',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

// add your API routes below
app.get('/profile/:id', async (req, res) => {
	const { id } = req.params;
	const profileQuery = await db.get('SELECT * FROM profile WHERE id = ?', id);
	const quotesQuery = await db.all('SELECT * FROM quote WHERE profile_id = ?', id);
	res.json({ profile: profileQuery, quotes: quotesQuery });
});

app.post('/profile/:id/like', async (req, res) => {
	const { id } = req.params;
	await db.run('UPDATE profile SET likes = likes + 1 WHERE id = ?', id);
	res.status(200).send('Likes incremented successfully');
});




app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
