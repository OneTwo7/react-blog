const mongoose = require('mongoose');
const encrypt = require('../utils/encrypt');

const userSchema = mongoose.Schema({
  id: String,
  email: { type: String, trim: true },
  name: { type: String, required: '{PATH} is required!' },
  salt: String,
  pwd_hash: String,
  roles: [String],
  activated: { type: Boolean, default: false },
  activation_digest: String,
  reset_digest: String
});

userSchema.methods = {
  authenticate: function (passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.pwd_hash;
  },
  hasRole: function (role) {
    return this.roles.includes(role);
  }
};

const User = mongoose.model('User', userSchema);

const sampleUsers = [
  {
    email: 'admin@example.com',
    password: 'foobar',
    name: 'John Doe',
    roles: ['admin'],
    activated: true
  },
  {
    email: 'guest@example.com',
    password: 'foobar',
    name: 'John Doono',
    roles: [],
    activated: true
  }
];

(async () => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      sampleUsers.forEach(user => {
        user.salt = encrypt.createSalt();
        user.pwd_hash = encrypt.hashPwd(user.salt, user.password);
        User.create(user);
      });
    }
  } catch (e) {
    console.log(e);
  }
})();
