const Post = require('../Models/Post'); 
const express = require('express');
const router = express.Router();
const postController = require('./Controllers/postController');
const Nedb = require('nedb');
const contactDB = new Nedb({filename:'./db/post.db', autoload: true});

router.get('/products', async (req, res) => {
  try {
    const posts = await postController.getAllPosts();
    const locations = groupPostsByLocation(posts); 
    res.render('products', { locations });
  } catch (err) {
    res.status(500).send(err);
  }
});



router.get('/new', verify, controller.show_new_entries)

exports.create = (req, res) => {
    const { itemDescription, numberHeld, location, image } = req.body;
    const post = new Post(itemDescription, numberHeld, location, image);
    post.create()
        .then(() => res.status(200).send({ message: 'Post created successfully.' }))
        .catch(err => res.status(500).send({ error: err.message }));
};

exports.delete = (req, res) => {
    const postId = req.params.id;
    Post.removePost(postId)
        .then(result => res.status(200).send({ message: `Removed ${result} post(s).` }))
        .catch(err => res.status(500).send({ error: err.message }));
};

exports.update = (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
      comment: req.body.comment,
      landlordRating: req.body.landlordRating,
      estateAgentRating: req.body.estateAgentRating
    };
    const post = new Post(updatedPost);
    post.update(postId)
      .then(numReplaced => {
        if (numReplaced === 0) {
          res.status(404).send('Post not found');
          return;
        }
        res.redirect('/posts');
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  
  function groupPostsByLocation(posts) {
    // Create an empty object to store the grouped posts
    const groupedPosts = {};
  
    // Loop through each post
    posts.forEach(post => {
      // Use the location of the post as the key
      const key = post.location;
  
      // If this location is not yet in the groupedPosts object, add it
      if (!groupedPosts[key]) {
        groupedPosts[key] = [];
      }
      // Add the post to the array of posts
      groupedPosts[key].push(post);
    });
  
    // Convert the groupedPosts object to an array of locations
    const locations = Object.keys(groupedPosts).map(location => ({
      location,
      posts: groupedPosts[location]
    }));
  
    return locations;
  }

  router.get('/products', async (req, res) => {
    try {
      const posts = await postController.getAllPosts();
      const locations = groupPostsByLocation(posts);
      res.render('products', { locations });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  