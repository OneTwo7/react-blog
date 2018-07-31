const router = require('express').Router();
const posts  = require('../controllers/posts');
const { requiresLogin } = require('../../utils/auth');
const { uploadsPath } = require('../../keys');

const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '../../..', uploadsPath)
});

router.get('/', posts.getPosts);

router.post('/', requiresLogin, upload.array('pictures'), posts.createPost);

router.put('/', requiresLogin, upload.array('pictures'), posts.updatePost);

router.delete('/:id', requiresLogin, posts.deletePost);

module.exports = router;
