const express = require('express');
const router = express.Router();
const nedb = require('gray-nedb');
const storeDB = new nedb({ filename: './db/store.db', autoload: true });

// Create a new store
router.post('/stores', (req, res) => {
    const newStore = req.body;
    storeDB.insert(newStore, function(err, store) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(store);
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
