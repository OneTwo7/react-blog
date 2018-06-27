const path = require('path');
const uploadsPath = path.join(__dirname, '../../dist/img/uploads');
const { env } = process;

module.exports = {
  googleClientID: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  githubClientID: env.GITHUB_CLIENT_ID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET,
  vkClientID: env.VK_CLIENT_ID,
  vkClientSecret: env.VK_CLIENT_SECRET,
  mongoURI: env.MONGO_URI,
  cookieKey: env.COOKIE_KEY,
  uploadsPath
};
