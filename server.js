const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';
const mode = process.env.MODE || 'standard';

dotenv.config();
dotenv.config({ path: './.env-dev' });

const keys = require('./app/keys');

require('./app/config/mongoose')(keys);

if (environment === 'development') {
  require('./app/services/webpack.js')(app);
}

require('./app/services/passport')(keys);

require('./app/config/express')(app, keys);

if (mode === 'demo') {
  require('./app/mocks/routes')(app);
} else {
  require('./app/routes/routes')(app);
}

if (environment === 'production') {
  const compression = require('compression');

  app.use(compression());
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  app.use(express.static('src'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
  });
}

app.listen(PORT);
