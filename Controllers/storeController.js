const Store = require('../Models/storeModel');
const storeDAO = new store();

exports.createUser = (req, res) => {
    const { storeName, email, address, postcode, telephone, password } = req.body;
  
    const newStore = new UserDAO(storeName, email, address, postcode, telephone, password);
  
    storeDAO.create(newStore, (err, store) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  
      res.redirect("/");
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
  
    pantryDao.updatePantry(address, postcode, telephone, password);
    res.redirect("/store/storeAccount");
};

exports.delete_store = function(req, res) {
    const userId = req.body.userId;
  
    // Call the deleteUser method from your userModel to delete the user
    storeDao.deleteUser(userId, (err) => {
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
    pantryDao.loadAllPantries()
      .then((list) => {
        res.render("store/stores", {
          users: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
};