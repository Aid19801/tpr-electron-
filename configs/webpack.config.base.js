/**
 * Base webpack config used across other specific configs
 */
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

export default {
  externals: [...Object.keys(externals || {}).filter(dep => ![
    'react-mapbox-gl',
    'mapbox-gl',
  ].includes(dep))],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      ...dotenv.config().parsed // <-- this line brings in .env environment variables
    }),

    new webpack.NamedModulesPlugin()
  ]
};
