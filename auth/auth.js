const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const user = new userModel;
const adminModel = require('../models/adminModel');
const admin = new adminModel;
const barnardosModel = require('../models/barnardosModel');
const newLocation = new barnardosModel;


// The 'login' function
exports.login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    userModel.lookup(username, function (err, user) {
        if (err) { 
            console.log("error looking up user", err); 
            return res.status(401).send();
        } 
        if (!user) { 
            console.log("user ", username, " not found"); 
            return res.render("/register");
        }
        //compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { username: username, isAdmin: isAdmin.role, id: user._id}; 
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                //and then pass onto the next middleware
                next();
            } else { 
                return res.status(403).send();
            }
        });
    });
}

// The 'verify' function
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
        //if an error occurred return request unauthorized error
        res.status(401).send();
    }
}

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
        //unauthorised acxcess error
        res.status(401).send();
        }
};

// Export the functions (no longer needed as using exports.)
//module.exports = {
    //login: login,
    //verify: verify
//};
