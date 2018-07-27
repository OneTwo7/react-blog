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
  s3AccessKey: env.S3_ACCESS_KEY,
  s3SecretKey: env.S3_SECRET_KEY,
  s3Bucket: env.S3_BUCKET,
  s3Region: env.S3_REGION,
  sendGridKey: env.SEND_GRID_KEY,
  domain: env.APP_DOMAIN
};
