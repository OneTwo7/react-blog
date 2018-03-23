const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('./app/services/webpack.js')(app);
}

app.use(express.static(path.join(__dirname, 'src')));

require('./app/config/routes')(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
    throw(err);
  }
  console.log(`Listening on port ${port}...`);
});
