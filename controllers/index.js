const router = require('express').Router(); // Import the express package and use the Router() method to create a new router object

const homeRoutes = require('./homeRoutes.js'); // Import the home routes from the home-routes.js file
const apiRoutes = require('./api'); // Import the api routes from the api/index.js file
const dashboardRoutes = require('./dashboard-routes.js'); // Import the dash routes from the dash-routes.js file



router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);// Use the home routes when the user visits the homepage (localhost:3001/)
router.use('/api', apiRoutes);// Use the api routes when the user visits the api homepage (localhost:3001/api)
// Use the dash routes when the user visits the dash homepage (localhost:3001/dashboard )

module.exports = router;