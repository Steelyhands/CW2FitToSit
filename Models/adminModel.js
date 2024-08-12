const nedb = require('gray-nedb');
const adminDB = new nedb({ filename: './db/admin.db', autoload: true });
const User = require('../Models/userModel');

class Admin extends User {
    constructor(fullName, email, address, isAdmin, username, password){
        super(fullName, email, address, isAdmin, username, password);
        this.isAdmin = isAdmin;
    }

    // Create a new admin
    static createAdmin(admin, callback) {
        db.insert(admin, callback);
      }

    // Update an existing admin
    static update(id, updatedAdmin, callback) {
        db.update({ _id: id }, { $set: updatedAdmin }, {}, callback);
      }

    // Remove an admin
    static removeAdmin(id, callback) {
        db.remove({ _id: id }, {}, callback);
      }

    // Get all admins
    static getAllAdmins() {
            return new Promise((resolve, reject) => {
                adminDB.find({}, function(err, admins) {
                    if (err) reject(err);
                    else resolve(admins);
                });
            });
        }

    // Get an admin by ID
    static getAdminById(adminId) {
                return new Promise((resolve, reject) => {
                    adminDB.findOne({_id: adminId}, function(err, admin) {
                        if (err) reject(err);
                        else resolve(admin);
                    });
                });
            }
}

module.exports = Admin;
