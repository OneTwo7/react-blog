const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const extractCSS = new ExtractTextPlugin('notifications.css');
const extractSCSS = new ExtractTextPlugin('styles.css');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = exports = {
  devtool: 'source-map',
  entry: './src/index',
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    extractCSS,
    extractSCSS,
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract(
          ['css-loader', 'sass-loader', 'postcss-loader']
        )
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=img/[name].[ext]&context=./src/img'
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' }
    ]
  }
};
