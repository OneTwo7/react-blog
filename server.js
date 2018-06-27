const express = require('express');
const path = require('path');
const keys = require('./app/keys');
const app = express();

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const mode = process.env.MODE || 'standard';

require('./app/config/mongoose')(keys);

if (env === 'development') {
  require('./app/services/webpack.js')(app);
}

require('./app/services/passport')(keys);

require('./app/config/express')(app, keys);

if (mode === 'demo') {
  require('./app/mocks/routes')(app);
} else {
  require('./app/routes/routes')(app);
}

if (env === 'production') {
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
