const router = require('express').Router();
const posts  = require('../controllers/posts');

const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '../..', 'src/img/uploads')
});

router.get('/', posts.getPosts);

router.post('/', upload.array('pictures'), posts.createPost);

router.put('/:id', upload.array('pictures'), posts.updatePost);

router.delete('/:id', posts.deletePost);

module.exports = router;
