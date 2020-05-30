const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development';

const config = {
  entry: [
    path.resolve(__dirname, './src/app.jsx'),
  ],
  mode: !isDevelopment ? 'production' : 'development',
  context: path.resolve(__dirname, './src'),

  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, './dist'),
    // publicPath: './',
  },

  devServer: {
    port: 9003,
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/',
  },

  devtool: isDevelopment ? 'source-map' : '',

  module: {
    unsafeCache: isDevelopment,
    rules: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css?[hash]',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  resolve: {
    unsafeCache: false,
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    descriptionFiles: ['package.json'],
  },
};

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDevelopment,
      presets: ['@babel/env', '@babel/react'],
      plugins: ['@babel/plugin-syntax-dynamic-import']
        .concat(isDevelopment ? [
          'react-hot-loader/babel',
        ] : [])
        .concat([
          ['@babel/plugin-transform-runtime', { regenerator: true }],
          ['@babel/plugin-proposal-object-rest-spread'],
          ['@babel/plugin-proposal-class-properties'],
        ]),
    },
  },
});

// Assets
//------------------------------------

const name = '[hash:base64:7].[ext]';

config.module.rules.push({
  test: /\.(png|jpg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        // outputPath: 'images/',
        // publicPath: '/images',
        name,
      },
    },
  ],
}, {
  test: /\.(ttf|wof|otf)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name,
      },
    },
  ],
}, {
  test: src => !src.endsWith('.inline.svg') && src.endsWith('.svg'),
  loader: 'file-loader',
  query: {
    outputPath: 'svg/',
    publicPath: '/dist',
    name,
  },
}, {
  test: src => src.endsWith('.inline.svg'),
  loader: 'svg-inline-loader',
});

// Styles
// ------------------------------------
config.module.rules.push({
  test: /\.less$/,
  use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ],
}, {
  test: src => src.endsWith('.css') && !src.endsWith('global.css'),
  use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[folder]_[local]_[hash:base64:5]',
        importLoaders: 1,
      },
    },
    'postcss-loader',
  ],
}, {
  test: src => src.endsWith('global.css'),
  use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
      },
    },
    'postcss-loader',
  ],
});

module.exports = config;
