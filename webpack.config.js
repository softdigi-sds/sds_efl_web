// webpack.config.js
// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',  // Injects styles into the DOM
            'css-loader',    // Turns CSS into CommonJS modules
            'sass-loader'    // Compiles Sass to CSS
          ],
        },
      ],
    },
  };