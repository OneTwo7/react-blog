const express = require('express');

const keys = require('./app/config/keys');

const port = 3000;
const app = express();

const env = process.env.NODE_ENV || 'development';

app.use(express.static(__dirname + '/src'));

require('./app/config/mongoose')(keys);

if (env === 'development') {
  require('./app/services/webpack.js')(app);
}

require('./app/services/passport');

require('./app/config/express')(app, keys);

require('./app/routes/routes')(app);

app.listen(port, err => {
  if (err) {
    console.error(err);
    throw(err);
  }
  console.log(`Listening on port ${port}...`);
});
