const crypto = require('crypto');

module.exports = {
  createSalt () {
    return crypto.randomBytes(128).toString('base64');
  },
  hashPwd (salt, pwd) {
    return crypto.createHmac('sha256', salt).update(pwd).digest('hex');
  },
  createToken () {
    return crypto.randomBytes(32).toString('base64');
  }
};
