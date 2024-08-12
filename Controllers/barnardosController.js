const userDAO = require('../Models/userModel.js');
const userModel = new userDAO();
const Post = require('../Models/postModel');
const auth = require('../auth/auth')
const jwt = require("jsonwebtoken");

exports.home_page = function (req, res) {
    res.render("home", {
        'header': true,
        'nav': true
    });
}

exports.about_page = function (req, res) {
    res.render("about", {
        'header': true,
        'nav': true
    });
}

exports.login_page = function (req, res) {
    res.render("login", {
        'header': true,
        'nav': true
    });
}

exports.logout = function (req, res) {
    res.clearCookie("jwt")
    .status(200)
    .redirect("/");
};

exports.contact_page = function (req, res) {
    res.render("contact", {
        'header': true,
        'nav': true
    });
}

exports.signup = function (req, res) {
    res.render("signup", {
        'header': true,
        'nav': true
    });
}

exports.handle_login = function (req, res) {
    // Call the Login method from Auth
    auth.login(req, res, function (err) {
        if (err) { // Catches error logging in
            console.error("Error:", err);
            res.render("login");
            return;
        }

        // Assign variable to store role
        const role = req.userRole;
        console.log("User Role:", role);

        // Directs to different pages based on a User's role
        if (role === 'user') {
            res.redirect("/properties");
        } else if (role === 'admin') {
            res.redirect("/admin");
        } else { // Catches any errors
            res.status(403).send("Error: Undefined Role");
        }
    });
};

exports.admin_page = function (req, res) {
    userModel.loadAllUsers()
        .then((list) => {
            res.render("admin", {
                'header': true,
                'nav': true,
                users: list
            });
        })
        .catch((err) => {
            console.log("Error Loading Users", err);
            res.status(500).send('Error Loading Users');
        });
}

exports.createAdmin = function (req, res) {
    res.render("createAdmin", {
        'header': true,
        'nav': true
    });
}

exports.addNewAdmin = function (req, res) {
    // Declaring variables
    const username = req.body.username; 
    const fullName = req.body.fullName;
    const email = req.body.email;
    const name = req.body.name;
    const address = req.body.address;
    const password = req.body.password;

    // Checks for no Username or Password
    if (!username || !password || !fullName || !email || !address) { 
        res.send(401, "No User or no Password"); // Catches error
        return;
    }

    // Runs the 'lookup' Function in the userModel to check if a User already exists
    userModel.lookup(username, function(err, u) {
        if (u) { // Catches if User exists
            console.log("An Admin with this Username already exists");
            res.send(401, "User exists:", username); 
            return; 
        }

        // If they don't already exist, you can create them
        userModel.createAdmin(username, name, password); 
        console.log("Registered User: ", username, ", Name: ", name, ", Password: ", password);
        res.redirect('/createAdmin');
    });
}

exports.handle_contact_form = (req, res) => {
    // Access form data from req.body
    const { name, email, message } = req.body;

    // Create a new Message with the form data
    const newMessage = new Message(name, email, message);
    // Save the new message to your db
    newMessage.save()
        .then(() => {
            // If saved successfully, send a success status
            res.status(200).send({ message: 'Message received.' });
        })
        .catch(err => {
            //error message
            res.status(500).send({ error: err.message });
        });
};
