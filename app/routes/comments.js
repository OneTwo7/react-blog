const router = require('express').Router({ mergeParams: true });
const comments = require('../controllers/comments');

router.get('/', comments.getCommentsByPostId);

router.post('/', comments.createComment);

router.put('/:commentId', comments.updateComment);

router.delete('/:commentId', comments.deleteComment);

module.exports = router;
