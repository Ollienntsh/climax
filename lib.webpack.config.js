const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map',
  },
  optimization: devMode
    ? {
        usedExports: false,
        providedExports: false,
        splitChunks: {
          chunks: 'all',
        },
      }
    : undefined,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
