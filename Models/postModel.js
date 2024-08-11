// Import the 'gray-nedb' package and create a new instance of nedb for posts
const nedb = require('gray-nedb');
const postDB = new nedb({ filename: './db/post.db', autoload: true });

// Define a class 'Post' with properties itemDescription, numberHeld, location, and image
class Post {
    constructor(itemDescription, numberHeld, location, image){
        this.itemDescription = itemDescription;
        this.numberHeld = numberHeld;
        this.location = location;
        this.image = image;
    }

    // Method 'create' to create a new post with given parameters
    // Only admins can create posts
    create(isAdmin) {
        if (!isAdmin) {
            return Promise.reject(new Error('Only admins can create posts.'));
        }
        const entry = {
            itemDescription: this.itemDescription,
            numberHeld: this.numberHeld,
            location: this.location,
            image: this.image,
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
    // Only admins can remove posts
    static removePost(postId, isAdmin) {
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
    static getAllPosts() {
        // Return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            // Use the find() function of the database to get the data
            postDB.find({}, function(err, posts) {
                if (err) reject(err);
                else resolve(posts);
            });
        });
    }
}

// Export the 'Post' class for use in other files
module.exports = Post;
