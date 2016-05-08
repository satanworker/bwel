// TODO : https://github.com/cmackay/ionic-webpack/blob/master/webpack.config.js
// TODO : https://github.com/AlexYankee/ionic-webpack-starter/blob/master/webpack.config.js
// TODO: https://github.com/shprink/angularjs-ionic-webpack-boilerplate/blob/master/webpack.config.js
// TODO: https://github.com/Foxandxss/angular-webpack-workflow/blob/master/webpack.make.js
// TODO: https://github.com/shprink/angular1.4-ES6-material-webpack-boilerplate/blob/master/webpack.config.js
var
  path = require('path'),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require('html-webpack-plugin'); // @see https://github.com/mako-taco/html-webpack-plugin/blob/master/README.md
module.exports = {
  context: __dirname,
  entry: {

    vendor: ['lodash', 'angular2', 'angular-ui-router', 'angular-sanitize', 'angular-animate', 'ionic2', 'ionic-angular2'], //, 'angular', 'angular-ui-router', 'angular-animate'],
    app: ["./src/js/app.bwell_trainers.js"]

  },
  output: {
    // path: __dirname + "/www/js",
    // filename: "./[name].js" 
    //   //filename: 'bundle.js'
    path: path.join(__dirname, "www/js"),
    filename: 'bundle.js'
      // filename: "[name].bundle.js",
      // chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: [{
        test: /[\/]angular\.js$/,
        loader: 'exports?angular' // For non commonJs
      }, {
        test: /[\/]ionic\.js$/,
        loader: 'exports?ionic' // For non commonJs
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      }, {
        test: [/\.tpl.html$/, /\.screen.html$/],
        loader: "html?attrs=img:data-src"
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }, {
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=expanded"
      }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=10000&name=./../img_hash/[hash].[ext]"
      }, {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&name=./../svg_hash/[hash].[ext]"
      }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },

      // {
      //   test: [/\.svg/, /\.eot/, /\.ttf/, /\.woff/, /\.woff2/],
      //   loader: 'file?name=fonts/[name].[ext]'
      // }, 

      {
        test: /\.js$/,
        loader: 'ng-annotate!babel!jshint',
        exclude: [/node_modules/, /bower_components/] //node_modules/  /www\/app_source/
      }
    ],
    // NOTE: this helps build speed on larger libraries that do not use commonjs
    noParse: [
      /bower_components/
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, "src"),
      path.join(__dirname, "bower_components"),
      path.join(__dirname, "node_modules"),
    ],
    moduleDirectories: [
      'bower_components',
      'node_modules'
    ],
    // @see https://github.com/shprink/angularjs-ionic-webpack-boilerplate/blob/master/webpack.config.js
    alias: {
      "angular2": 'angular/angular.js',
      "ionic2": 'ionic/js/ionic.js',
      "ionic-angular2": 'ionic/js/ionic-angular.js',
      "ionic$": 'ionic/js/ionic.js',
      "ionic-angular": 'ionic/js/ionic-angular.js',
      "src": [path.join(__dirname, 'src')]
    }
  },
  externals: {
    'angular': 'angular',
    'ionic': 'ionic'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash"
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity),
    //new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("./../css/[name].css", {
      allChunks: true
    }),
    // @see http://webpack.github.io/docs/usage-with-bower.html
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    // @see https://github.com/AlexYankee/ionic-webpack-starter/blob/master/webpack.config.js
    // new HtmlWebpackPlugin({
    //   pkg      : require('./package.json'),
    //   template : 'src/index.html',
    //   env  : 'developments' //argv.env || 'development'
    // })
  ]
};
