const router = require('express').Router(); // Import the express package and use the Router() method to create a new router object
const userRoutes = require('./userRoutes'); // Import the userRoutes.js file
const postRoutes = require('./postRoutes'); // Import the postRoutes.js file


router.use('/users', userRoutes); // Use the router object to create a new route for the userRoutes.js file (localhost:3001/api/users
router.use('/posts', postRoutes); // Use the router object to create a new route for the postRoutes.js file (localhost:3001/api/posts














module.exports = router;// Export the router object to be used in the server.js file