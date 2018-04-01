const router = require('express').Router();
const users = require('../controllers/users');

router.get('/', users.getUsers);

router.post('/', users.createUser);

module.exports = router;
