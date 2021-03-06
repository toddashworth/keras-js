const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [ path.join(__dirname, 'src/index') ],
  output: { path: path.join(__dirname, 'dist'), filename: 'bundle.js' },
  devtool: 'eval',
  module: {
    rules: [
      { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: [ 'raw-loader', 'glslify-loader' ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: { context: __dirname, postcss: [ precss, autoprefixer ] }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    })
  ]
};
