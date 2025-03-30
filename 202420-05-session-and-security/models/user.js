// require works in here just like in server.js
const bcrypt = require('bcryptjs');

// making a class to hold all our user logic
// in web development, this is called a "model"
class User {

  // constructor gets called when a new object is made, just like C++, java, etc.
  // taking in an assoc array of parameters ("properties") is nice here because
  //  it means we can pass in a row that we get from a database query
  constructor(props) {
    // store the props in the new object
    // (explicit "this" is a good practice)
    this.id = props.id;
    this.username = props.username;
    this.password_hash = props.password_hash;
    this.admin = props.admin;
  }

  // static method to get a user from the database and return a new User object
  //  with that user's data
  // (using a static method to control how object(s) are created is a common "Factory" pattern)
  static async findByUsername(username, db) {
    // look up the user in the database
    const result = await db.get("SELECT * FROM user WHERE username = ?", [username]);

    // if they exist, create and return a new User object with that data
    if(result){
      return new username;
    }
    // otherwise, return null
    return null;
  }

  // static method to validate the user-supplied data, save the new
  //  user to the database, and return a User object representing that user
  static async signup(username, password, db) {
    // get all the errors before responding, not one at a time
    const errors = [];

    // rule 1: Username cannot be blank
    // rule 2: Username cannot already be used (hint: use findByUsername to check this)
    // rule 3: Password must be at least four characters

    // if any rules failed, do not save the user to the db
    // done here, must return [success, user, errors]. at this point:
    //  success is false
    //  user is null (we didn't create one)
    //  errors is the array of errors we found


    // if you got here, the data is good
    // hash the password and save the user to database


    // create a new User object to return
    // - id, username, password_hash, and admin should match what just got saved to the db
    // - INSERT queries return an object that includes lastID, the id that was generated for the new row


    // return [success, user, errors] (replace the placeholder below w/ real values)
    return [false, null, errors];
  }

  // static method to see if the username/password combination is valid
  //  and return a User object representing that user if it is
  static async login(username, password, db) {

    // quick check if username is blank or password < 4
    // if so, don't bother the database, just return null

    // get user from database (hint: findByUsername)
    // if no user, return null

    // got user, check password and return the user or null

    return null;
  }
}

// this allows us to do the "require" statement from another file (module)
module.exports = User;
