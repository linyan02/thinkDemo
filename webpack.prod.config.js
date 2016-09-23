'use strict';

var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
      path.resolve(__dirname, 'www/static/app/plan.js')
    ],
    output: {
        path: path.resolve(__dirname, 'www/static/js'),
        filename: "[name].js",//[hash:8].
        publicPath: '/'
    },
    resolve: {
      extension: ['', '.jsx', '.js', '.json'],
      alias: {}
    },
    'display-error-details': true,
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.js[x]?$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css/,
          include: path.resolve(__dirname, 'www/static/app'),
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.less/,
          include: path.resolve(__dirname, 'www/static/app'),
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.(png|jpg)$/,
          include: path.resolve(__dirname, 'www/static/app'),
          loader:"url-loader?name=img/[name].[ext]"//[hash:8].
          //loader: 'url?limit=8192'
        },{
           test: /\.gif$/,
           include: path.resolve(__dirname, 'www/static/app'),
            loader:"url-loader?name=img/[name].[ext]"//[hash:8].
          // loader: "url-loader?mimetype=image/gif"
        },
        {
          test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          include: path.resolve(__dirname, 'www/static/app'),
          loader: "url?limit=102400"
        },
        {
          test: path.join(path.resolve(__dirname, 'app/components/js/jquery-1.8.2.min')),
          loader: 'expose?jQuery'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("main.css", {//.[hash:8]
          allChunks: true,
          disable: false
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),//[hash:8].
      new uglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'your app title',
        template: './www/static/app/index.html',
      }),
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),

    ]
};
