const router = require('express').Router();
const posts  = require('../controllers/posts');

router.get('/', posts.getPosts);

router.post('/', posts.createPost);

router.put('/:id', posts.updatePost);

router.delete('/:id', posts.deletePost);

module.exports = router;
