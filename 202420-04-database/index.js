
let express = require('express');

let path = require('path');

const PORT = 8000;

let static_dir = path.join(__dirname, 'static');


let fakeDatabase = [
    {
        id: 1,
        name: 'Blue Noodles',
        description: 'Delicious blue noodles.',
        price: 10,
        imageUrl: 'https://www.loveandoliveoil.com/wp-content/uploads/2018/04/butterfly-noodle-bowls-5-600x900.jpg',
        reviews: [
            { name: 'Alice', comment: 'Love these noodles!' },
            { name: 'Bob', comment: 'Not bad, could use more salt.' }
        ]
    },
    {
        id: 2,
        name: 'Rock',
        description: 'A sturdy rock.',
        price: 20,
        imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/dv424076/Boulder--Namibia--Africa/960x0.jpg?format=jpg&width=960',
        reviews: [
            { name: 'Charlie', comment: 'It’s a rock.' }
        ]
    }
];


let app = express();

app.use(express.static(static_dir));


 app.get('/time', (req, res) =>{
     const currentTime = new Date().toLocaleTimeString();
     res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Current Time</title>
        </head>
        <body>
            <h1>Current Time</h1>
            <p>The current time is: ${currentTime}</p>
        </body>
        </html>
    `);
 });

app.set('view engine', 'ejs');

app.get('/items', (req, res) => {
    res.render('items', {items: fakeDatabase});
});

app.get('/item_view/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = fakeDatabase.find(item => item.id === itemId);
    if (item) {
        res.render('item_view', { item });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/add_review/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = fakeDatabase.find(item => item.id === itemId);
    if (!item) {
        return res.sendStatus(404);
    }

    const { name, comment } = req.body;
    let errors = [];

    if (!name.trim()) errors.push("Name can't be blank");
    if (!comment.trim()) errors.push("Review can't be blank");

    if (errors.length > 0) {
        res.render('item_view', { item, errors });
    } else {
        if (!item.reviews) item.reviews = [];
        item.reviews.push({ name, comment });
        res.redirect('/item_view/' + itemId);
    }
});








app.listen(8000, () => console.log(`Server listening on port ${PORT}`));

