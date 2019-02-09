const path = require('path')
const IconfontWebpackPlugin = require('iconfont-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cssFilename = 'static/css/[name].[hash:8].css'

const extractTextPluginOptions = {
  filename: cssFilename,
  publicPath: Array(cssFilename.split('/').length).join('../')
}

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
    // Set up an ES6-ish environment
    babel_polyfill: '@babel/polyfill',
    vendor: ['jquery']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: NODE_ENV === 'development' ? '[name].js' : '[name][hash:6].js'
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 300
  },
  resolve: {
    extensions: ['*', '.js', '.styl', '.pub']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      // babel
      {
        test: /\.(js)?$/,
        loaders: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [new IconfontWebpackPlugin(loader)]
              }
            }
          ]
        })
      },
      {
        test: /\.pug$/,
        use: [
          'file-loader?name=[path][name].html',
          'pug-html-loader?pretty&exports=false'
        ]
      },
      {
        test: /\.php$/,
        use: 'file-loader?name=/php/[hash:6].[ext]'
      },
      {
        test: /\.zip$/,
        use: 'file-loader&name=/files/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=/img/[hash:6].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=/font/[hash:6].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'public')
        },
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'IE > 10'],
            cascade: true,
            remove: true
          }),
          require('css-mqpacker')()
        ]
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin(extractTextPluginOptions),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/views/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
          })
        ]
      }
    })
  ]
}
