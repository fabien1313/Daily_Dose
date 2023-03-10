const router = require('express').Router();// Import the express package and use the Router() method to create a new router object
const { post, comment, user } = require('../models/');
const withAuth = require('../utils/auth');






module.exports = router;