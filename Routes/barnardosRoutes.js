const Nedb = require('nedb');
const contactDB = new Nedb({filename:'./db/contact.db', autoload: true})

// Import the express module
const express = require('express');
// Create a new router
const router = express.Router();
// Import the controllers
const controller = require('../controllers/barnardosController.js');
const postController = require('../controllers/postController.js');
const User = require('../Models/userModel');
const {login, verify} = require('../auth/auth'); // Add verify here

// Define routes for different paths
// landing page
router.get(["/","Home","/Homepage"], controller.home_page);

// about page
router.get("/about", controller.about_page);
// contact page
router.get("/contact", controller.contact_page);
router.post("/contact", controller.handle_contact_form);

// home page
router.get("/home", controller.home_page);

// login page
router.get("/login", controller.login_page);

// signup page
router.get("/signup", (req, res) => {
    res.render('signup');
});

// Route for handling form submissions to '/signup'
router.post('/signup', (req, res) => {
    // Access form data from req.body
    const { userId } = req.body;
    const user = new User(userId);
    user.createUser()
        .then(() => res.status(200).send({ message: 'User created successfully.' }))
        .catch(err => res.status(500).send({ error: err.message }));
});

// handling 404 errors
//router.use(function (req, res) {
    //res.status(404);
    //res.type('text/plain');
   // res.send('404 Not found.');
//});

// handling internal server errors
router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

// GET handler for '/contact'
router.get('/contact', (req, res) => {
    // Render the contact form
    res.render('contact_form');
});



// Export the router for use in other files
module.exports = router;
