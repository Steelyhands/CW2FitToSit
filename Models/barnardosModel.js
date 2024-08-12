const nedb = require('nedb');
const db = new nedb({ filename: './db/users.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

class BarnardosModel {
  constructor(username, name, password, email, address) { 
    this.name = name;
    this.password = password;
    this.email = email;
    this.address = address; 
  }

  createAdmin() {
    return bcrypt.hash(this.password, saltRounds)
      .then(hash => {
        const entry = {
          username: this.username,
          name: this.name,
          password: hash,
          email: this.email,
          address: this.address,
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

  static saveMessage(name, email, message) { // Add this method
    const entry = { name, email, message };
    return new Promise((resolve, reject) => {
      messagesDb.insert(entry, function(err, newDoc) {
        if (err) reject(err);
        else resolve(newDoc);
      });
    });
  }
}

class Message { // Add this class
  constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
  }

  save() {
    const entry = { name: this.name, email: this.email, message: this.message };
    return new Promise((resolve, reject) => {
      messagesDb.insert(entry, function(err, newDoc) {
        if (err) reject(err);
        else resolve(newDoc);
      });
    });
  }


contact(name, email, message){
  var entry = {
      name: contactName,
      email: email,
      message: message,
  }

  publicDB.insert(entry, function (err, doc) {
      if (err) {
          console.log('Error adding message', subject);
      } else {
          console.log('Message added into the database', doc);
      }
  });
}
}

module.exports = BarnardosModel;
