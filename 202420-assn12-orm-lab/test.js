// import the library as a class
const Sequelize = require('sequelize');

// instantiate the library for use, specifying the type of database and (in the case of sqlite) the database file
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'addresses.sqlite'
});

// init-models contains a function to load all the models in that directory
const initModels = require('./models/init-models');

// call it and use destructuring bind to get the ones your want
const { Person, PhoneNumber } = initModels(sequelize);

// need an async function to use await (could also use the .then/.catch promise syntax)
const test = async () => {

    // connect to the database to verify your installation and configuration
    // (other db drivers "authenticate" w/ username/password, sqlite does not)
    try {
        await sequelize.authenticate();
        console.log("Connected to database");

        const result = await Person.findAll();
        console.log(JSON.stringify(result, null, 2));

        const result1 = await Person.findByPk();
        console.log(JSON.stringify(result1, null, 2));


        const result2 = await Person.findOne();
        console.log(JSON.stringify(result2, null, 2));

        const newPerson = await Person.create({
            firstName: 'Alice',
            lastName: 'Johnson',
            age: 28
        });

        console.log(JSON.stringify(newPerson, null, 2));


        const jane = await Person.findByPk(1);
        jane.last_name = "help";
        jane.save();


        await newPerson.destroy();

        console.log(JSON.stringify(jane, null, 2));
        console.log(await jane.PhoneNumber());

        const two = await Person.findByPk(2, ({include: {model: PhoneNumber, as: "PhoneNumbers"}}));
        console.log(JSON.stringify(two, null, 2));



    } catch(err) {
        console.log("Failed to connect: " + err);
    }
}

test();
