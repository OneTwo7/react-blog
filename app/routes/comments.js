const router = require('express').Router({ mergeParams: true });
const comments = require('../controllers/comments');
const { requiresLogin } = require('../utils/auth');

router.get('/', comments.getCommentsByPostId);

router.post('/', requiresLogin, comments.createComment);

router.put('/:commentId', requiresLogin, comments.updateComment);

router.delete('/:commentId', requiresLogin, comments.deleteComment);

module.exports = router;
