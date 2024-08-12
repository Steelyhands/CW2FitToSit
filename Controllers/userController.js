const UserDAO = require('../Barnardos/models/UserModel'); // Update the path as needed
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

exports.createUser = (req, res) => {
  const { fullName, email, address, isAdmin, username, password } = req.body;

  // Check if any of the required fields are missing
  if (!fullName || !email || !address || !username || !password) {
    res.status(400).send('Error: Missing required fields.');
    return;
  }

  const newUser = new UserDAO(fullName, email, address, isAdmin, username, password);

  UserDAO.create(newUser, (err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.redirect("/");
  });
};

exports.updateUser = (req, res) => {
  const { fullName, email, address, isAdmin, userName, password } = req.body;

  if (!fullName || !email || !address || !isAdmin || !userName || !password) {
    res.status(401).send("Please provide all user details");
    return;
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      res.status(500).send("Error hashing password");
      return;
    }

    const updatedUser = {
      fullName: fullName,
      email: email,
      address: address,
      isAdmin: isAdmin,
      userName: userName,
      password: hash,
    };

    UserDAO.updateUser(userName, updatedUser)
      .then(() => res.json({ message: 'User updated successfully' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
};

exports.deleteUser = (req, res) => {
  const id = req.body.id;

  // Call the deleteUser method from userModel to delete the user
  UserDAO.deleteUser(id, (err) => {
    if (err) {
      // Handle error
      console.error("Error deleting user:", err);
      res.status(500).send("Internal server error");
      return;
    }
    // Redirect back to the user database page after deletion
    res.redirect("/user/users");
  });
};
//passing user info
exports.showUserUpdate = (req, res) => {
  res.render('user/updateUser', {
    user: 'user'
  });
}

//view account details
exports.showUserAccount = (req, res) => {
  res.render('user/userAccount', {
    user: 'user',
    post: 'post'
  });
}

//View all users
exports.viewAllUsers = (req, res) => {
  Admin.viewAllUsers((err, users) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.render("admin/allUsers", { users });
  });
};

// It's a route handler for viewing all users.
exports.viewAllUsers = (req, res) => {
  // The Admin model's viewAllUsers method is called.
  // This method is expected to retrieve all users from the database.
  Admin.viewAllUsers((err, users) => {
    //error handling
    if (err) {
      //internal server error
      res.status(500).send(err);
      return;
    }
    // If there's no error, the server responds by rendering the "admin/allUsers" view.
    // The retrieved users are passed to the view for display.
    res.render("admin/allUsers", { users });
  });
};