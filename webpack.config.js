const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const target = isDev ? 'web' : 'browserslist';

const filename = (ext) => (isDev ? `[name].${ext}` : `[contenthash].${ext}`);
const assetName = (folder) => `assets/${folder}/[contenthash][ext]`;

const styleLoader = () => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { 
        publicPath: '',
        esModule: isDev,
      },
    },
    'css-loader'
  ];
  if (!isDev) loaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          postcssPresetEnv({ stage: 0 }),
        ]
      }
    }
    });
  loaders.push('sass-loader');
  return loaders;
}

module.exports = {
  mode: mode,
  target: target,
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: assetName('images')
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: assetName('fonts')
        },
      },
      {
        test: /\.(wav|ogg|mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: assetName('sound')
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: styleLoader(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: !isDev,
    }),
    new HTMLWebpackPlugin({
      template: './src/checkout.html',
      filename: 'checkout/index.html',
      minify: !isDev,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from : 'src/assets/images/static/',
          to: 'assets/images/'
        }
      ]
    })
  ],

  devtool: isDev ? 'source-map' : 'hidden-nosources-source-map',
  devServer: {
    port: 9000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    open: true,
    hot: isDev,
    historyApiFallback: true,
  },
}
