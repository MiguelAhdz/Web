const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const session = require('express-session');

User = require('./models/user');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'awesome.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();

// use urlencoding for form POSTs
app.use(express.urlencoded({extended: false}));

// use server-side in-memory session
app.use(session({secret: 'superSecret', resave: false, saveUninitialized: false}));

// serve static files
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');


//////////////////////////////////////////////////////////////////
// home page (/)
//
// case 1: the user has logged in already
//  - they have an active session with a User object in it
// outcome: render the home view and pass the User object in
//
// case 2: the user hasn't logged in
//   - they don't have an active session, or there is no User object in it
// outcome: render the home view *without* any User object

app.get('/', (req,res) => {
	// (this is just here so it doesn't hang)
	if (req.session.user) {
		res.render('home', { user: req.session.user });
	} else {
		res.render('home');
	}
});

//////////////////////////////////////////////////////////////////
// login
//
// case 1: the user is logged in already
//  - they have an active session with a User object in it
//  - can't login without logging out first
// outcome: redirect them back to the home view
//
// case 2: the user hasn't logged in
//   - they don't have an active session, or there is no User object in it
// outcome: render the login form

app.get('/login', (req,res) => {
	// (this is just here so this doesn't hang)
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('login', { error: null, username: '' });
	}
});

////////////////
// login POST
//
// case 1: successful login
//  - the username/password match what's in the db
// outcome: store the user in session and redirect to the home view
//
// case 2: unsuccessful login
//  - the username/password don't match what's in the db
// outcome: re-render the login form
//  - include error messages
//  - don't make them retype the username

app.post('/login', async (req,res) => {
	// get username and password from the POST body

	// call User.login to attempt to login

	// if success, store the user object in session and redirect to home page

	// else re-render the login form w/ errors and username

	// (this is just here so this doesn't hang)
	const { username, password } = req.body;
	try {
		const user = await User.login(db, username, password);
		if (user) {
			req.session.user = user;
			res.redirect('/');
		} else {
			res.render('login', { error: 'Invalid username or password', username });
		}
	} catch (error) {
		res.render('login', { error: 'Login failed', username });
	}
});

//////////////////////////////////////////////////////////////////
// register
//
// case 1: the user is logged in already
//  - they have an active session with a User object in it
//  - can't register without logging out first
// outcome: redirect them back to the home view
//
// case 2: the user hasn't logged in
//   - they don't have an active session, or there is no User object in it
// outcome: render the register form

app.get('/register', (req,res) => {

	// (this is just here so this doesn't hang)
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.render('register', { error: null, username: '' });
	}
});

////////////////
// register POST
//
// case 1: successful registration
//  - valid username (not blank, not duplicate)
//  - valid password (> 4 characters)
// outcome: save the user to the db, store in session, and redirect to the home view
//
// case 2: unsuccessful registration
//  - invalid username or password
// outcome: re-render the registration form
//  - include error messages
//  - don't make them retype the username

app.post('/register', async (req,res) => {
	// get username and password from the POST body

	// call User.signup to attempt to register

	// if success, store the user object in session and redirect to home page

	// else re-render the registration form w/ errors and username

	// (this is just here so this doesn't hang)
	const { username, password } = req.body;
	try {
		const user = await User.signup(db, username, password);
		if (user) {
			req.session.user = user;
			res.redirect('/');
		} else {
			res.render('register', { error: 'Registration failed', username });
		}
	} catch (error) {
		let errorMsg = 'Registration failed';
		if (error.message.includes('UNIQUE constraint failed')) {
			errorMsg = 'Username already exists';
		}
		res.render('register', { error: errorMsg, username });
	}
});

//////////////////////////////////////////////////////////////////
// a sample content page
//
// case 1: the user is logged in
//  - they have an active session with a User object in it
// outcome: render the content view with that User object
//
// case 2: the user isn't logged in
//   - they don't have an active session, or there is no User object in it
// outcome: render the noaccess view

app.get('/content', (req,res) => {

	// (this is just here so this doesn't hang)
	if (req.session.user) {
		res.render('content', { user: req.session.user });
	} else {
		res.render('noaccess');
	}
});

//////////////////////////////////////////////////////////////////
// logout
//
// remove the user from session and redirect to the home view
//

app.get('/logout', (req,res) => {
	// delete the user from the session
	delete req.session.user;
	// and redirect to the home view
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));