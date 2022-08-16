// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name].${isProduction ? 'prod' : 'dev'}.[contenthash].js`,
    environment: {
      arrowFunction: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3
          }]]
        }
      },
      {
        test: /\.scss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    config.plugins.push(new CleanWebpackPlugin());

    config.optimization = {
      minimize: true,
        minimizer: [
        new TerserPlugin({ extractComments: false }),
        new CssMinimizerPlugin()
      ]
    };

  } else {
    config.mode = "development";

    config.devtool = 'eval-source-map';
    config.devServer = {
      open: true,
      host: "0.0.0.0",
      port: 8000,
      static: '.',
      hot: true
    };
  }
  return config;
};
