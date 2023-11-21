const path = require('path')
const HTMLWeebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'webpack-dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new HTMLWeebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    host: 'localhost',
    port: '2000',
    historyApiFallback: true
  }
}