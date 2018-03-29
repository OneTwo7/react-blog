const mongoose = require('mongoose');
const encrypt = require('../utils/encrypt');

const userSchema = mongoose.Schema({
  email:    { type: String, required: '{PATH} is required!', unique: true },
  name:     { type: String, required: '{PATH} is required!' },
  salt:     { type: String, required: '{PATH} is required!' },
  pwd_hash: { type: String, required: '{PATH} is required!' },
  roles:    [String]
});

userSchema.methods = {
  authenticate: function (passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.pwd_hash;
  },
  hasRole: function (role) {
    return this.roles.indexOf(role) !== -1;
  }
};

const User = mongoose.model('User', userSchema);

const sampleUsers = [
  {
    email: 'admin@example.com',
    password: 'foobar',
    name: 'John Doe',
    roles: ['admin']
  },
  {
    email: 'guest@example.com',
    password: 'foobar',
    name: 'John Doono',
    roles: []
  }
];

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    sampleUsers.forEach(user => {
      user.salt = encrypt.createSalt();
      user.pwd_hash = encrypt.hashPwd(user.salt, user.password);
      User.create(user);
    });
  }
});
