const router = require('express').Router();// import the Router() method from the express package
const { user } = require('../../models');// import the User model from the models folder




// Create a new user
router.post('/', async (req, res) => {// This is the POST route for localhost:3001/api/users
	try {
		const dbUserData = await user.create({// This creates a new user in the database
			username: req.body.username,// This gets the username from the request body
			password: req.body.password,// This gets the password from the request body
		});
		req.session.save(() => {// This saves the session
			req.session.loggedIn = true;// This sets the loggedIn property to true
			req.session.username = dbUserData.username;// This sets the username property to the username from the database
			req.session.userNameId= dbUserData.id;// This sets the userNameId property to the id from the database
			res.status(200).json(dbUserData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Login
router.post('/login', async (req, res) => {// This is the POST route for localhost:3001/api/users/login
	try {
		const dbUserData = await user.findOne({// This looks for a user from the database
			where: {
				username: req.body.username,// This gets the username from the request body
			},
		});
		if (!dbUserData) {// If the user doesn't exist
			res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
			return;
		}
		const validPassword = dbUserData.checkPassword(req.body.password);// This checks the password from the request body against the password in the database
		if (!validPassword) {// If the password is incorrect
			res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
			return;
		}
		req.session.save(() => {// This saves the session
			req.session.loggedIn = true;// This sets the loggedIn property to true
			req.session.username = dbUserData.username;
			req.session.userNameId= dbUserData.id;
			res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});


// Logout
router.post('/logout', (req, res) => {// This is the POST route for localhost:3001/api/users/logout
	if (req.session.loggedIn) {// If the user is logged in
		req.session.destroy(() => {// This destroys the session
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;// export the router