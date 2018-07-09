const router = require('express').Router();
const users = require('../controllers/users');

router.post('/', users.createUser);

module.exports = router;
