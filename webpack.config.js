const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const modifyManifest = () => {
  const pkg = require('./package.json')
  let manifest = require('./src/manifest.json')

  manifest.name = pkg.name
  manifest.description = pkg.description
  manifest.version = pkg.version

  return JSON.stringify(manifest, null, 2)
}

const packageName = String(require('./package.json').name)


module.exports = {
  entry: {
    content: './src/content.tsx',
    background: './src/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist', packageName),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: 'manifest.json',
          transform: (content, _) => {
            return modifyManifest(content);
          },
        },
        {
          from: './icons/*',
          to: ''
        },
      ],
    }),
  ],
};
