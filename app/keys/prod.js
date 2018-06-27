const path = require('path');
const uploadsPath = path.join(__dirname, '../../dist/img/uploads');

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  vkClientID: process.env.VK_CLIENT_ID,
  vkClientSecret: process.env.VK_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  uploadsPath
};
