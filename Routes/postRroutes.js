const Post = require('../Barnardos/Models/Post'); // Assuming Post class is in '../models/Post'

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
  