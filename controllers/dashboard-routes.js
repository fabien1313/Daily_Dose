const router = require('express').Router();// Import the express package and use the Router() method to create a new router object
const { post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('postcontrol', {
            layout: 'dashboard',
            posts,
        });


    } catch (e) {
        res.redirect('login');
    }
});






module.exports = router;