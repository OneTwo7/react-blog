const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod');

process.env.NODE_ENV = 'production';

console.log(`Generating minified bundle for production via Webpack.
This will take a moment...`);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log(
    '\nYour app has been compiled in production mode and written to /dist.' +
    'It\'s ready to roll!\n'
  );

  return 0;
});
