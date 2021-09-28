const path = require('path')

console.log(`Path: ${path.join(__dirname, 'front/public')}`)

module.exports = {
  entry: './front/src/app.js',
  output: {
    path: path.join(__dirname, 'front/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'front/public'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',        
        pathRewrite: { '^/api': '' },
        changeOrigin: true
        // pathRewrite: function (path, req) { return path.replace('/api', '') }
      },
    },
  }
}