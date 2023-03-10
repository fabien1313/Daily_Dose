const router = require('express').Router();// import the Router() method from the express package
const { post } = require('../../models');// import the Post model from the models folder
const withAuth = require('../../utils/auth');// import the withAuth() function from the utils folder

router.post('/', withAuth, async (req, res) => { // This is the GET route for localhost:3001/api/
	const body = req.body; // This gets the body of the request

	try {
		const createPost = await post.create({
			...body, userId: req.session.userId
		});
		res.json(createPost);

	} catch (e) {
		console.log(e)
		res.status(500).json(e)
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
		res.render('singlepost', posts);// This renders the template and passes the food object to the template
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});





module.exports = router;// export the router