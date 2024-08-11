// Import the User model
const User = require('../Barnardos/models/barnardosModel');

// Define the controller object
const controller = {};

// Define the landing_page function
controller.home_page = (req, res) => {
    res.render('home_page');
};

// Define the about_page function
controller.about_page = (req, res) => {
    res.render('about_page');
};

// Define the contact_page function
controller.contact_page = (req, res) => {
    res.render('contact_page');
};

exports.handle_login = function (req, res) {
    res.render("home", {
    title: "login",
    user: "user"
    });
};

const {verify} = require('../auth/auth')

// Export the controller object
module.exports = controller;
