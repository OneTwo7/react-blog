const router = require('express').Router();
const users = require('../controllers/users');
const { requiresLogin } = require('../utils/auth');

router.post('/', users.createUser);

router.patch('/:id', requiresLogin, users.updateUser);

router.delete('/:id', requiresLogin, users.deleteUser);

module.exports = router;
