const express = require('express');
const router = express.Router();
const Controller = require('./Controllers/storeController');
const auth = require('../auth/auth');
const post = require('./Controllers/postController');


// Create a new store
router.post('/stores', storeController.create_store);

// Get all stores
router.get('/stores', storeController.show_stores);

// Get specific store
router.get('/stores/:id', storeController.show_store_posts);

// Update 
router.put('/stores/:id', storeController.update_store);

// Delete
router.delete('/stores/:id', storeController.delete_store);

// Show login page
router.get('/login', storeController.show_login);

// login
router.get('/login', controller.show_login);
router.post('/login', storeController.handle_login);

router.get('/storeAccount', auth.verifyStore, controller.show_store_account);

module.exports = router;

// handling 404 errors
//router.use(function (req, res) {
    //res.status(404);
    //res.type('text/plain');
   // res.send('404 Not found.');
//});