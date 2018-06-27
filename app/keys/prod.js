const path = require('path');
const uploadsPath = path.join(__dirname, '../../dist/img/uploads');
const dev = require('./dev');
const { env } = process;

module.exports = {
  googleClientID: env.GOOGLE_CLIENT_ID || dev.googleClientID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET || dev.googleClientSecret,
  githubClientID: env.GITHUB_CLIENT_ID || dev.githubClientID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET || dev.githubClientSecret,
  vkClientID: env.VK_CLIENT_ID || dev.vkClientID,
  vkClientSecret: env.VK_CLIENT_SECRET || dev.vkClientSecret,
  mongoURI: env.MONGO_URI || dev.mongoURI,
  cookieKey: env.COOKIE_KEY || dev.cookieKey,
  uploadsPath
};
