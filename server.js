const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'src/css')));

app.get('/favicon.ico', (req, res) => {
  res.status(204);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    throw(err);
  }
  console.log(`Listening on port ${port}...`);
});
