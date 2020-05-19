const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      configFile: path.resolve(__dirname, '../../..', 'babel.config.js'),
    },
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  );

  config.resolve.extensions.push('.ts', '.tsx', '.css');

  return config;
};
