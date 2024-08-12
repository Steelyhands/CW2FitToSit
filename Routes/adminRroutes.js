const express = require('express');
const router = express.Router();
const AdminController = require('../Barnardos/controllers/adminController');

// Route to display the form for creating a new admin
router.get('/createAdmin', AdminController.createAdmin);

// Route to handle the creation of a new admin
router.post('/createAdmin', AdminController.addNewAdmin);

// Middleware for checking if admin exists and has correct permissions
router.use('/admins/:id', AdminController.checkAdmin);

// Route to display the form for updating an existing admin
router.get('/admins/:id/edit', (req, res) => {
  res.render('updateUser', { admin: req.admin });
});

// Route to handle updating an existing admin
router.put('updateAdmin', AdminController.update);

// Route to handle deleting an existing admin
router.delete('/deleteAdmin/:id', AdminController.delete);

// Route to display all admins
router.get('/displayAdmins', AdminController.admin_page);

module.exports = router;

// handling 404 errors
//router.use(function (req, res) {
    //res.status(404);
    //res.type('text/plain');
   // res.send('404 Not found.');
//});