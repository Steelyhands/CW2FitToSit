const express = require('express');
const router = express.Router();
const storeDB = new nedb({ filename: './db/store.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a new store
router.post('/stores', (req, res) => {
});

// Get all stores
router.get('/stores', (req, res) => {
    storeDB.find({}, function(err, stores) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.send(stores);
    });
});

// Get specific store
router.get('/stores/:id', (req, res) => {
    const _id = req.params.id;

    storeDB.findOne({ _id: _id }, function(err, store) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (!store) {
            res.status(404).send();
            return;
        }

        res.send(store);
    });
});

// Update 
router.put('/stores/:id', (req, res) => {
    const _id = req.params.id;
    const updatedStore = req.body;

    storeDB.update({ _id: _id }, updatedStore, {}, function(err, numReplaced) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.send(`Updated ${numReplaced} store(s)`);
    });
});

// Delete
router.delete('/stores/:id', (req, res) => {
    const _id = req.params.id;

    storeDB.remove({ _id: _id }, {}, function(err, numRemoved) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.send(`Deleted ${numRemoved} store(s)`);
    });
});

module.exports = router;


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
    const id = req.body.id;
  
    // deleteStore
    Store.deleteStore(id, (err) => {
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
