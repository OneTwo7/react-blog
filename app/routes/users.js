const router = require('express').Router();
const users = require('../controllers/users');

router.get('/', users.getUsers);

module.exports = router;
