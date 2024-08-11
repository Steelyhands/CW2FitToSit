const Admin = require('../Barnardos/Models/Admin'); // Assuming Admin class is in '../models/Admin'
const bcrypt = require('bcrypt');


// Middleware for checking if admin exists and has correct permissions
function checkAdmin(req, res, next) {
    const adminId = req.params.id;
    const loggedInAdminId = req.user.id;
  
    Admin.getAdminById(adminId)
      .then(admin => {
        if (!admin) {
          return res.status(404).send('Admin not found');
        }
        if (admin._id.toString() !== loggedInAdminId && !admin.isAdmin) {
          return res.status(403).send('Unauthorized');
        }
        next();
      })
      .catch(err => next(new Error('Internal Server Error')));
}

exports.update = [checkAdmin, (req, res, next) => {
  const adminId = req.params.id;
  const updatedAdmin = {
    fullName: req.body.fullName,
    email: req.body.email,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
    username: req.body.username,
    password: req.body.password
  };

  bcrypt.hash(updatedAdmin.password, saltRounds, function(err, hash) {
    if (err) {
      return next(new Error('Internal Server Error'));
    }

    updatedAdmin.password = hash;

    Admin.updateAdmin(adminId, updatedAdmin)
      .then(numReplaced => {
        if (numReplaced === 0) {
          return res.status(404).send('Admin not found');
        }
        res.redirect('/admin');
      })
      .catch(err => next(new Error('Internal Server Error')));
  });
}];

exports.delete = [checkAdmin, (req, res, next) => {
  const adminId = req.params.id;

  Admin.removeAdmin(adminId)
    .then(() => res.redirect('/admin'))
    .catch(err => next(new Error('Internal Server Error')));
}];

// Create admin
exports.createAdmin = (req, res, next) => {
  const { fullName, email, address, isAdmin, username, password } = req.body;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return next(new Error('Internal Server Error'));
    }

    const newAdmin = new Admin(fullName, email, address, isAdmin, username, hash);

    newAdmin.create()
      .then(() => res.redirect("/admins"))
      .catch(err => next(new Error('Internal Server Error')));
  });
};
const Admin = require('../Barnardos/Models/Admin'); // Assuming Admin class is in '../models/Admin'
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

// Middleware for checking if admin exists and has correct permissions
function checkAdmin(req, res, next) {
    const adminId = req.params.id;
    const loggedInAdminId = req.user.id;
  
    Admin.getAdminById(adminId)
      .then(admin => {
        if (!admin) {
          return res.status(404).send('Admin not found');
        }
        if (admin._id.toString() !== loggedInAdminId && !admin.isAdmin) {
          return res.status(403).send('Unauthorized');
        }
        next();
      })
      .catch(err => next(new Error('Internal Server Error')));
}

exports.update = [checkAdmin, (req, res, next) => {
  const adminId = req.params.id;
  const updatedAdmin = {
    fullName: req.body.fullName,
    email: req.body.email,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
    username: req.body.username,
    password: req.body.password
  };

  bcrypt.hash(updatedAdmin.password, saltRounds, function(err, hash) {
    if (err) {
      return next(new Error('Internal Server Error'));
    }

    updatedAdmin.password = hash;

    Admin.updateAdmin(adminId, updatedAdmin)
      .then(numReplaced => {
        if (numReplaced === 0) {
          return res.status(404).send('Admin not found');
        }
        res.redirect('/admin');
      })
      .catch(err => next(new Error('Internal Server Error')));
  });
}];

exports.delete = [checkAdmin, (req, res, next) => {
  const adminId = req.params.id;

  Admin.removeAdmin(adminId)
    .then(() => res.redirect('/admin'))
    .catch(err => next(new Error('Internal Server Error')));
}];

// Create admin
exports.createAdmin = (req, res, next) => {
  const { fullName, email, address, isAdmin, username, password } = req.body;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return next(new Error('Internal Server Error'));
    }

    const newAdmin = new Admin(fullName, email, address, isAdmin, username, hash);

    newAdmin.create()
      .then(() => res.redirect("/admins"))
      .catch(err => next(new Error('Internal Server Error')));
  });
};
