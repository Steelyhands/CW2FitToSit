const Store = require('../Models/storeModel');
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create_store = (req, res) => {
    const { storeName, email, address, postcode, telephone, password } = req.body;
  
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const newStore = new Store(storeName, email, address, postcode, telephone, hash);
  
        Store.create(newStore, (err, store) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
  
            res.redirect("/");
        });
    });
};

exports.show_login = function (req, res) {
    res.render("store/login");
};

exports.handle_login = function (req, res) {
    res.render("home", {
      user: "user"
    });
};

exports.update_store = function (req, res) {
    const storeName = req.body.storeName;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const telephone = req.body.telephone;
    const password = req.body.password;
  
    if (!storeName || !address || !postcode || !telephone || !password) {
      res.send(401, "make sure all fields are completed ");
      return;
    }
  
    Store.update_Store(storeName, address, postcode, telephone, password);
    res.redirect("/store/storeAccount");
};

exports.delete_store = function(req, res) {
    const userId = req.body.userId;
  
    // Call the deleteUser method from your userModel to delete the user
    Store.deleteStore(userId, (err) => {
        if (err) {
            // Handle error
            console.error("Error deleting user:", err);
            res.status(500).send("Internal server error");
            return;
        }
        // Redirect back to the user database page after deletion
        res.redirect("/store/stores");
    });
};

exports.show_stores = function (req, res) {
    Store.loadAllStores()
      .then((list) => {
        res.render("store/stores", {
          stores: list,  
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
};


// Get a specific store and its associated posts
exports.show_store_posts = function (req, res) {
    const _id = req.params.id;

    Store.findById(_id)
        .then((store) => {
            if (!store) {
                res.status(404).send();
                return;
            }

            // Find posts with the same location as the store
            return Post.find({ location: store.location })
                .then((posts) => {
                    res.render("store/store_and_posts", {
                        store: store,
                        posts: posts
                    });
                });
        })
        .catch((err) => {
            console.log("promise rejected", err);
            res.status(500).send();
        });
};
