const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
  filename: '[name]-[contenthash].css',
  allChunks: true,
  disable: true,
});

const outputPath = path.join(process.cwd(), 'server', 'middlewares');
module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals({
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
  entry: [
    path.join(process.cwd(), 'app/serverEntry.js'),
  ],
  output: {
    path: outputPath,
    filename: 'generated.serverEntry.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      use: extractCSS.extract({
        use: 'css-loader/locals',
      }),
      // loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      // exclude: /node_modules/, ExtractTextPlugin.extract({
      use: extractCSS.extract({
        use: ['css-loader/locals', 'sass-loader'],
      }),
    }, {
      test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: [
          'dynamic-import-node',
        ],
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        {
          loader: 'file-loader',
          query: {
            emitFile: false,
          },
        },
        {
          loader: 'img-loader',
          options: {},
        },
      ],
    }],
  },
  plugins: [
    extractCSS,
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        browser: false,
      },
    }),
  ],
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
  },
};
