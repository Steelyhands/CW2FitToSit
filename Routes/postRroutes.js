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
