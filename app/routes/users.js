const router = require('express').Router();
const users = require('../controllers/users');
const { requiresLogin } = require('../utils/auth');

router.post('/', users.createUser);

router.get('/:email/activate/:token', users.activateUser);

router.post('/resend_activation_link', users.resendActivationLink);

router.post('/password_reset', users.generateResetToken);

router.get('/:email/reset/:token', users.authenticateResetToken);

router.patch('/:id', requiresLogin, users.updateUser);

router.delete('/:id', requiresLogin, users.deleteUser);

module.exports = router;
