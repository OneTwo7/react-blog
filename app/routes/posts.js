const router = require('express').Router();
const path   = require('path');
const posts  = require('../controllers/posts');
const { requiresAdmin } = require('../utils/auth');
const { uploadsPath } = require('../keys');

const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../..', uploadsPath) });

router.get('/', posts.getPosts);

router.post('/', requiresAdmin, upload.array('pictures'), posts.createPost);

router.put('/', requiresAdmin, upload.array('pictures'), posts.updatePost);

router.delete('/:id', requiresAdmin, posts.deletePost);

module.exports = router;
