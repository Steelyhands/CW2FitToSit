const nedb = require('gray-nedb');
const adminDB = new nedb({ filename: './db/admin.db', autoload: true });

class AdminDAO {
    constructor(name, email, address, phoneNumber, isAdmin, username, password){
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
        this.username = username;
        this.password = password;
    }

    // Create a new admin
    create() {
        const entry = {
            name: this.name,
            email: this.email,
            address: this.address,
            phoneNumber: this.phoneNumber,
            isAdmin: this.isAdmin,
            username: this.username,
            password: this.password,
        };
        return new Promise((resolve, reject) => {
            adminDB.insert(entry, function(err, newAdmin) {
                if (err) reject(err);
                else resolve(newAdmin);
            });
        });
    }

    // Update an existing admin
    static updateAdmin(adminId, updatedData) {
        return new Promise((resolve, reject) => {
            adminDB.update({_id: adminId}, { $set: updatedData }, {}, function(err, numReplaced) {
                if (err) reject(err);
                else resolve(numReplaced);
            });
        });
    }

    // Remove an admin
    static removeAdmin(adminId) {
        return new Promise((resolve, reject) => {
            adminDB.remove({_id: adminId}, {}, function(err) {
                if (err) reject(err);
                else resolve('Admin deleted.');
            });
        });
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

module.exports = AdminDAO;
