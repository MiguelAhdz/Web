const express = require('express');
const path = require('path');

PORT=8080;

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

// non-persistent data storage
const history = [];

app.get('/convo', (req,res) => {
	res.render('redirectForm', {
		history: history
	});
});

app.post('/talk', (req,res) => {
    // append new message
    history.push(req.body.comment);

    // and re-render page w/ that info
    res.render('redirectForm', {
        history: history
    });
});

const isBad = str => str === "arugula";

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
