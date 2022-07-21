const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'views/react'),
  entry: {
    Index: './Index.js',
    Home: './Home.js'
  },
  output: {
    path: path.resolve(__dirname, "public/js/react"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  mode:'development',
  watch: true
}