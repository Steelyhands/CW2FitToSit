const nedb = require('nedb');
const db = new nedb({ filename: './db/users.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

class BarnardosModel {
  constructor(username, name, password) {
    this.username = username;
    this.name = name;
    this.password = password;
  }

  createAdmin() {
    return bcrypt.hash(this.password, saltRounds)
      .then(hash => {
        const entry = {
          username: this.username,
          name: this.name,
          password: hash,
        };
        return new Promise((resolve, reject) => {
          db.insert(entry, function(err, newDoc) {
            if (err) reject(err);
            else resolve(newDoc);
          });
        });
      });
  }

  static lookup(username) {
    return new Promise((resolve, reject) => {
      db.findOne({ username: username }, function(err, user) {
        if (err) reject(err);
        else resolve(user);
      });
    });
  }

  static loadAllUsers() {
    return new Promise((resolve, reject) => {
      db.find({}, function(err, users) {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }
}

module.exports = BarnardosModel;
