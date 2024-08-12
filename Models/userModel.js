const nedb = require('nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

//creating and initialising UserDAO object
class UserDAO {
    constructor(fullName, email, address, isAdmin, userName){
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.isAdmin = isAdmin;
    }

    // Create a new user
    createUser(fullName, email, address, isAdmin, userName) {
        const entry = {
            userName: userName,
            fullName: fullName,
            email: email,
            address: address,
            isAdmin: isAdmin,
        };
            userDB.insert(entry, function(err, newUser) {
                if (err){ 
                    reject(err);
                }
                else{ 
                    resolve(newUser);
                }
            });
    }

    // Update an existing user
    updateUser(id, updatedData) {
            userDB.update({_id: id}, { $set: updatedData }, {}, function(err, numReplaced) {
                if (err){
                    console.log('Error updating user: ', err);
                }
                else{
                    console.log('User updated successfully');
                }
            });
    }

    // Remove a user
    removeUser(id) {
            userDB.remove({_id: id}, {}, function(err, removeUser) {
                if (err){ 
                    reject(err);
                }
                else{ 
                    console.log("user" + id + "removed from system")
                    resolve(removeUser);
                }
            });
    }

    // Get all users
    getAllUsers() {
        return new Promise((resolve, reject) => {
            userDB.find({}, function(err, users) {
                if (err){
                    reject(err);
                }
                else{
                    console.log("all users: ", users);
                }
            });
        });
    }

    // Get a user by ID
    getUserById(id, cb) {
        userDB.find({_id: id}, function(err, user) {
            if (err){ 
                console.log('User not found');
                return cb(err);
            }
            else {
                if (user.length == 0){
                    console.log("please provide a valid ID");
                    return cb(null, null);
                }
                console.log("user:" + user)
                return cb(null, user[0]);
            }
        });
}

}

module.exports = UserDAO;
