// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 
module.exports = {
  mode: 'production',
  entry:{
    'facesoft': './src/index.js',
    'facesoft.min':'./src/index.js',
  },
  
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Facesoft'
  },
 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ["@babel/preset-env", "@babel/preset-flow"]
            }
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  node: {
    fs: 'empty'
  }
}