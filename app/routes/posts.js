const router = require('express').Router();
const path   = require('path');
const posts  = require('../controllers/posts');
const { requiresAdmin } = require('../utils/auth');

const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../src/img/uploads') });

router.get('/', posts.getPosts);

router.post('/', requiresAdmin, upload.array('pictures'), posts.createPost);

router.put('/:id', requiresAdmin, upload.array('pictures'), posts.updatePost);

router.delete('/:id', requiresAdmin, posts.deletePost);

module.exports = router;
