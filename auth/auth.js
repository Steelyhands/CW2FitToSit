// Import required modules
const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const user = new userModel;
const adminModel = require("../Models/adminModel");
const admin = new adminModel;
const jwt = require("jsonwebtoken");
const barnardosModel = require('../models/barnardosModel');
const newLocation = new barnardosModel;

// User login 
exports.login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    // Lookup user
    user(username, function (err, user) {
        if (err) { 
            console.log("error looking up user", err); 
            return res.status(401).send();
        } 
        if (!user) { 
            console.log("user ", username, " not found"); 
            return res.render("/register");
        }

        // Compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { username: username, isAdmin: isAdmin.role, id: user._id}; 
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                next();
            } else { 
                return res.status(403).send();
            }
        });
    });
}

// Admin login 
exports.admin_login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    // Lookup admin
    admin.lookup(username, function (err, user) {
        if (err) { 
            console.log("error looking up user", err); 
            return res.status(401).send();
        } 
        if (!admin) { 
            console.log("Admin ", username, " not found"); 
            return res.render("/login");
        }

        // Compare provided password with stroed password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { username: username, isAdmin: isAdmin.role, id: user._id}; 
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                // Pass onto the nxt middleware
                next();
            } else { 
                return res.status(403).send();
            }
        });
    });
}

// Verify function
exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt; 
    if (!accessToken) { 
        return res.status(403).send();
    } 
    let payload; 
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next(); 
    } catch (e) {
        // If an error occurred return request unauthorised error
        res.status(401).send();
    }
}

// Verify user 
exports.verifyUser = function (req, res, next) 
{
  let accessToken = req.cookies.jwt;
    let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
     if (payload.role != "admin" && payload.role != "user") {
    return res.status(403).send();
  }
     try {
    next();
    } catch (e) {
    // Unauthorised error
    res.status(401).send();
  }
};

// Verify admin 
exports.verifyAdmin = function (req, res, next) {
  let accessToken = req.cookies.jwt;
    let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (payload.role != "admin") {
            return res.status(403).send();
        }
    try {
            next();
        } 
    catch (e) {
        // Unauthorised access error
        res.status(401).send();
        }
};

// Verify store 
exports.verifyStore = function (req, res, next) 
{
  let accessToken = req.cookies.jwt;
    let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (payload.role != "admin" && payload.role != "pantry") {
    return res.status(403).send();
  }
  try {
    next();
  } 
  catch (e) {
    // Unauthorised error
    res.status(401).send();
  }
};


// Export the functions (no longer needed as using exports.)
//module.exports = {
    //login: login,
    //verify: verify
//};
