const crypto = require('crypto');

module.exports = {
  createSalt: () => (
    crypto.randomBytes(128).toString('base64')
  ),
  hashPwd: (salt, pwd) => (
    crypto.createHmac('sha256', salt).update(pwd).digest('hex')
  )
};
