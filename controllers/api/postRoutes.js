const router = require('express').Router();// import the Router() method from the express package
const { post } = require('../../models');// import the Post model from the models folder
const withAuth = require('../../utils/auth');// import the withAuth() function from the utils folder

router.get('/', withAuth, async (req, res) => {// This is the GET route for localhost:3001/api/food
	try {
		const dbPostData = await post.findAll({// This gets all the food from the database
			where: {
				user_id: req.session.user_id
			},
		});
		const posts = dbPostData.map((post) => post.get({ plain: true }));// This maps over the food data and converts it to a plain object
		req.session.save(() => {// This saves the session
			if (req.session.countVisit) {// If the countVisit property exists
				req.session.countVisit++;// This increments the countVisit property
			} else {
				req.session.countVisit = 1;// This sets the countVisit property to 1
			}
			res.render('dash', {// This renders the allFood.handlebars template
				posts, // This passes the foods object to the template
				countVisit: req.session.countVisit,// This passes the countVisit property to the template
				loggedIn: req.session.loggedIn,// This passes the loggedIn property to the template
			});
		});
	} catch (err) {
		res.redirect('login');
		res.status(500).json(err);
	}
});



// GET 
router.get('/:id', async (req, res) => {// This is the GET route for localhost:3001/api/posts/:id
	try {
		const dbPostData = await post.findByPk(req.params.id, {// This gets the food with the id that matches the id in the URL
			// include: [
			// 	{
			// 		model: post,// This includes the post model
			// 		attributes: ['title', 'content'],// This includes the title, content, and timestamps attribute from the post model
			// 	},
			// ],
		});
		const posts = dbPostData.get({ plain: true });// This converts the food data to a plain object
		res.render('single', posts);// This renders the template and passes the food object to the template
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});





module.exports = router;// export the router