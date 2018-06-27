const { NODE_ENV: env, MODE: mode } = process.env;

if (env === 'production' && mode !== 'build-test') {
  module.exports = require('./prod');
} else if (mode === 'build-test') {
  module.exports = Object.assign({}, require('./dev'), {
    uploadsPath: require('./prod').uploadsPath
  });
} else {
  module.exports = require('./dev');
}
