const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  output: {
    path: path.resolve(`${__dirname}/dist/`)
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        }
      }
    ]
  },
  externals: {
    'vue': 'Vue'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugins.js'),
    output: {
      filename: 'multiple-sortable.min.js',
      libraryTarget: 'window',
      library: 'MultipleSortable'
    }
  }),
  merge(config,
  {
    entry: path.resolve(__dirname + '/src/MultipleSortable.vue'),
    output: {
      filename: 'multiple-sortable.js',
      libraryTarget: 'umd',
      library: 'multiple-sortable',
      umdNamedDefine: true
    }
  })
];
