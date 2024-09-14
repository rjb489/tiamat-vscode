const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/chat_app/index.js', // React app entry point (JavaScript)
  output: {
    path: path.resolve(__dirname, 'out/chat_app'),
    filename: 'bundle.js', // The bundled JS file to load in the webview
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel loader for JS files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Add this rule to handle CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/chat_app/index.html', // The HTML template to use
    }),
  ],
  watch: true,
  mode: 'development',
  devtool: 'source-map'
};
