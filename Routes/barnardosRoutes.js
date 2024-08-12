// Import the express module
const express = require('express');
// Create a new router
const router = express.Router();
// Import the controllers
const controller = require('../controllers/barnardosController.js');
const postController = require('../controllers/postController.js');
const User = require('../Models/userModel');
const {login, verify} = require('../auth/auth') // Add verify here



router.post('/login', login,controller.handle_login);

// Define routes for different paths
// landing page
router.get(["/","Home","/Homepage"], controller.home_page);

// about page
router.get("/about", controller.about_page);
// contact page
router.get("/contact", controller.contact_page);
// home page
router.get("/home", controller.home_page);

// login page
router.get("/login", controller.login_page);

// signup page
router.get("/signup", (req, res) => {
    res.render('signup');
});

// handling internal server errors
router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});


// Route for handling form submissions to '/signup'
router.post('/signup', (req, res) => {
    // Access form data from req.body
    const { userId } = req.body;

    // Here you would typically validate the input data and save the new user to your database
    // For example:
    const user = new User(userId);
    user.createUser(userId)
        .then(() => res.status(200).send({ message: 'User created successfully.' }))
        .catch(err => res.status(500).send({ error: err.message }));
});

// Export the router for use in other files
module.exports = router;
