const router = require('express').Router();// Import the express package and use the Router() method to create a new router object
const { post, comment, user } = require('../models/');


// GET HOMEPAGE
router.get('/', async (req, res) => {
	try {
		const dbPostData = await post.findAll({ //Find all posts
			include: [user], // Posts found are from the user table
		});

		const posts = dbPostData.map((post) => post.get({ plain: true }));
		res.render('myposts', { posts });  // Render the myposts handlebar and pass in the posts object on the homepage.

	} catch (e) {
		console.log(e); // If there is an error, log it to the console
		res.status(500).json(e); // If there is an error, return a status code of 500 and the error message in JSON
	}
});



// GET LOGIN PAGE
router.get('/login', (req, res) => {// Use the get() method to create a GET route for the login page (localhost:3001/
	if (req.session.loggedIn) { // if user logs in successfully, redirect to homepage
		res.redirect('/');
		return;
	}

	res.render('login'); //if they dont, keep them on login page
});

// GET SIGNUP PAGE
router.get('/signup', (req, res) => {// Use the get() method to create a GET route for the login page (localhost:3001/login)
	if (req.session.loggedIn) {// If the user is logged in, redirect them to the homepage
		res.redirect('/');// Use the redirect() method to redirect the user to the homepage
		return;
	}

	res.render('signup');
});

// GET SINGLE POST
router.get('/post/:id', async (req, res) => {
	try {
		const dbPostData = await post.findByPk(req.params.id, { //set up params for id value
			include: [user, { model: comment, include: [user], },], // Posts found are from the user table
		});

		if (dbPostData) { // If the post exists, render the singlepost handlebar and pass in the post object
			const post = dbPostData.get({ plain: true }); // Serialize the data so the template can read it

			res.render('singlepost', { post }); // Render the singlepost handlebar and pass in the post object
		} else {
			res.status(404).end(); // If the post doesn't exist, return a 404 status code
		}
	} catch (e) {
		console.log(e); // If there is an error, log it to the console
		res.status(500).json(e); // If there is an error, return a status code of 500 and the error message in JSON
	}
});





module.exports = router;