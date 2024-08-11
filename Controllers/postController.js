const postDB = require('../Models/postModel');


// Method 'create' to create a new post with given parameters
// Only admins can create posts
exports.createPost = function(isAdmin) {
    if (!isAdmin) {
        return Promise.reject(new Error('Only admins can create posts.'));
    }
    const entry = {
        itemDescription: this.itemDescription,
        numberHeld: this.numberHeld,
        location: this.location,
        image: this.image,
        price: this.price,
    };
    // Insert the entry into the database
    return new Promise((resolve, reject) => {
        postDB.insert(entry, function(err, newDoc) {
            if (err) reject(err);
            else resolve(newDoc);
        });
    });
}

// Static method 'removePost' to remove a post based on its ID
//checking to see if user is admin or not
// Only admins can remove posts
exports.removePost = function(postId, isAdmin) {
    if (!isAdmin) {
        return Promise.reject(new Error('Only admins can remove posts.'));
    }
    // Remove the post from the database
    return new Promise((resolve, reject) => {
        postDB.remove({_id: postId}, {}, function(err, numRemoved) {
            if (err) reject(err);
            else resolve(numRemoved);
        });
    });
}

// Static method 'getAllPosts' to get all posts from the database
exports.getAllPosts = function() {
    // Return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        // Use the find() function of the database to get the data
        postDB.find({}, function(err, posts) {
            if (err) reject(err);
            else resolve(posts);
        });
    });
}

exports.update = function(req, res) {
    const postId = req.params.id;
    const updatedPost = {
      comment: req.body.comment,
      landlordRating: req.body.landlordRating,
      estateAgentRating: req.body.estateAgentRating
    };
    const userId = req.user.id; // Assuming user ID is stored in the session
    const isAdmin = req.user.isAdmin; // Assuming isAdmin flag is set for admins
  
    if (!isAdmin) {
      return Promise.reject(new Error('Only admins can update posts.'));
    }
  
    return new Promise((resolve, reject) => {
      postDB.update({_id: postId}, updatedPost, {}, function(err, numReplaced) {
        if (err) reject(err);
        else resolve(numReplaced);
      });
    });
  };
  
  