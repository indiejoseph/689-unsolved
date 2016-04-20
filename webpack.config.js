import NotifyStatsPlugin from './webpack/notifyStatsPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

const src = path.join(__dirname, './src');
const buildOutputPath = path.join(__dirname, './dist');
const NODE_ENV = process.env.NODE_ENV || 'development';
const __PROD__ = NODE_ENV === 'production';
const __DEV__ = NODE_ENV === 'development';

function extractText (loaders) {
  if (__PROD__) {
    return ExtractTextPlugin.extract('style', loaders);
  }
  return 'style!' + loaders;
}
let jsLoader = (__DEV__ ? 'react-hot!' : '') + 'babel?cacheDirectory=true';
let config = {
  target: 'web',

  entry: {
    app: [path.join(src, '/index.js')]
  },

  output: {
    path: buildOutputPath,
    pathInfo: true,
    publicPath: '',
    filename: 'main.js',
    css: 'style.css',
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js'
  },

  plugins: [
    new CleanWebpackPlugin(['./dist'], {
      root: path.join(__dirname, './'),
      verbose: true,
      dry: false
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name].css?[hash]-[chunkhash]-[contenthash]-[name]', { allChunks: true }),
    new NotifyStatsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${ NODE_ENV }'`,
        BABEL_ENV: JSON.stringify('development/client'),
        __BROWSER__: JSON.stringify(true)
      }
    })
  ],

  resolve: {
    root: path.resolve(src),
    extensons: ['', '.js', '.sass', '.scss'],
    modulesDirectories: ['node_modules']
  },

  devtool: __PROD__ ? false : 'eval',

  module: {
    noParse: [
      /\.DS_Store$/,
      /node_modules\/method/
    ],
    loaders: [
      { test: /\.s(c|a)ss$/, exclude: [/dist/],
        loader: extractText('css?minimize!postcss!sass?indentedSyntax') },
      { test: /\.css$/, exclude: [/dist/], loader: extractText('css?minimize') },
      { test: /\.js$/, exclude: [/node_modules/, /dist/], loader: jsLoader },
      { test: /\.json$/, include: [/src/], loader: 'json' },
      { test: /\.(png|jpg|gif)$/, loader: 'file?name=[path][name].[ext]?[hash]' },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file?name=fonts/[name].[ext]?[hash]?limit=100000' },
      { test: /\.html$/, loader: 'html' }
    ]
  },

  postcss: {
    defaults: [autoprefixer({ browsers: ['last 2 version'] })]
  }
};

if (__PROD__) {
  // Add UglifyJS
  config.plugins = config.plugins.concat([
    // Stop modules with syntax errors from being emitted.
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: false,
      mangle: false,
      compress: {
        drop_console: true /* jscs:ignore */
      },
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]);
} else {
  config.devServer = {
    contentBase: 'src',
    https: false,
    stats: {
      colors: true
    },
    historyApiFallback: true
  };
  config.entry.app.unshift(
    'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
    'webpack/hot/only-dev-server',
  );
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]);
}

export default config;
