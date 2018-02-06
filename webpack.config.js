const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
     bundle: path.join(__dirname, '/src/index.js'),
     // Set up an ES6-ish environment
     babel_polyfill: 'babel-polyfill',
     vendor: [
     'jquery'
     ]
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
    extensions: ['*', '.js', '.scss', '.pub']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      // BABEL
      {
        loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
      path.resolve(__dirname, "src"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.js?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime', 'transform-decorators-legacy'],
        presets: ['es2015', 'stage-0'],
      }
    },
    {
      test: /\.css$/i,
      use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: {
          loader: 'css-loader',
          query: {
            hashPrefix: 'package-name' + Date.now()
          }
        }
      })
    },
    {
      test: /\.(scss)$/i,
        // using "loader" instead of newer "use"
        loader: ExtractTextPlugin.extract({
          loader: [
          {
            loader: 'css-loader',
            query: {
              importLoaders: 3,
              minimize: true,
              sourceMap: false
            }
          },
          {loader: 'postcss-loader'},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader'}
          ]
        })
      },
      {
        test: /\.pug$/,
        use: ['file-loader?name=[path][name].html', 'pug-html-loader?pretty&exports=false']
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
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin({
      filename: NODE_ENV === 'development' ? '[name].css' : '[hash:6].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/views/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bundle', 'babel_polyfill', 'vendor']
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     unsafe: true
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
        autoprefixer({
          browsers: [
          'last 3 version',
          'ie >= 10'
          ]
        })
        ]
      }
    })
    ]
  }
