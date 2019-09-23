const path = require('path'),
  HtmlPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV: mode = 'development' } = process.env;
const isDev = mode === 'development';

module.exports = {
  mode,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isDev ? '[name]-[hash].js' : '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  devtool: isDev && 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        use: 'svelte-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve('node_modules')]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    new HtmlPlugin({
      hash: true,
      title: 'SVMD Playground',
      filename: isDev ? 'index.html' : '200.html',
      meta: {
        'theme-color': '#43a047',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
