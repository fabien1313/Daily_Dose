const router = require('express').Router();// Import the express package and use the Router() method to create a new router object
const { post, comment, user } = require('../models/');

// GET HOMEPAGE

router.get ('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
			include: [user],
		});

        const posts = dbPostData.map((post) => post.get({ plain: true }));
		res.render('myposts', {posts});

    } catch (e) {
        console.log(e); // If there is an error, log it to the console
        res.status(500).json(e); // If there is an error, return a status code of 500 and the error message in JSON
    }
});


// !GET LOGIN -- {{work in progress}}
router.get('/login', (req, res) => {// Use the get() method to create a GET route for the login page (localhost:3001/login)
	// if (req.session.loggedIn) {// If the user is logged in, redirect them to the homepage
	// 	res.redirect('/');// Use the redirect() method to redirect the user to the homepage
	// 	return;
	// }
	res.render('login');// Use the render() method to render the login handlebar
});

router.get('/signup', (req, res) => {// Use the get() method to create a GET route for the login page (localhost:3001/login)
	if (req.session.loggedIn) {// If the user is logged in, redirect them to the homepage
		res.redirect('/');// Use the redirect() method to redirect the user to the homepage
		return;
	}

	res.render('signup');
});





module.exports = router;