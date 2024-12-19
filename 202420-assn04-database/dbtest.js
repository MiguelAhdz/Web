const sqlite3 = require('sqlite3');

const {open} = require('sqlite');

console.log("I Live");

(async () => {
    const db = await open({
        filename: 'shopping.sqlite',
        driver: sqlite3.Database
    });

    // const id = 2;
    // const result = await db.get('SELECT  * FROM item WHERE id = ?', [id]);

    // const id = 3;
    // const result = await db.run('DELETE FROM reviews WHERE id = ?;', [id]);

    // const id = 3;
    // const result = await db.run('INSERT INTO reviews (id, item_id, author_id, text) VALUES (?, ?, ?, ?);', ["thing one", "something", "thing 2", 77.7]);

    // const id = 3;
    // const result = await db.run('UPDATE item SET name = ? WHERE id = ?', ["thing one", id]);

    console.log(result);





})();


console.log("I Die");