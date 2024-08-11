router.get('/new', verify, controller.show_new_entries)

// Importing express
const express = require('express');

// Creating a new router object from the express module
const router = express.Router();

// Importing the userController from the specified path
const userController = require('..Barnardos/controllers/userController');

// Route to display the form for creating a new admin
router.get('/createAdmin', userController.createAdminForm);

// Route to handle the POST request to create a new admin
router.post('/createAdmin', userController.createAdmin);

// Route to get all users
router.get('/allUsers', userController.viewAllUsers);

// Route to delete a user by their ID
router.delete('/allUsers/:id', userController.deleteUser);

// Exporting the router object to be used in other modules
module.exports = router;
