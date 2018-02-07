const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = {
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
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  externals: {
    'vue': 'Vue'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Vue': 'vue'
    })
  ]
};

let config;
if (process.env.NODE_ENV === 'production') {
  const productionConfig = merge(baseConfig, {
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        mangle: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ],
    devtool: '#source-map'
  });
  config = [
  merge(productionConfig, {
    entry: path.resolve(__dirname + '/src/plugins.js'),
    output: {
      filename: 'multiple-sortable.min.js',
      libraryTarget: 'window',
      library: 'MultipleSortable'
    }
  }),
  merge(productionConfig,
  {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'multiple-sortable.js',
      libraryTarget: 'umd',
      library: 'MultipleSortable',
      umdNamedDefine: true
    }
  }),
 ];
} else {
  console.error(`\`${process.env.NODE_ENV}\` is not defined.`);
}

module.exports = config;