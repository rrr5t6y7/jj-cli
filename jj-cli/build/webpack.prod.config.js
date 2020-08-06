const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  /*入口*/
  // entry: path.join(__dirname, "../src/index.js"),

  entry: {
    app: ["@babel/polyfill", path.join(__dirname, "../src/index.js")],
    vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"],
  },

  mode: "production",

  devtool: "none",

  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  resolve: {
    alias: {
      pages: path.join(__dirname, "../src/pages"),
      components: path.join(__dirname, "../src/components"),
      router: path.join(__dirname, "../src/router"),
      actions: path.join(__dirname, "../src/redux/actions"),
      reducers: path.join(__dirname, "../src/redux/reducers"),
      images: path.join(__dirname, "../src/images"),
      assets: path.join(__dirname, "../src/assets"),
      utils: path.join(__dirname, "../src/utils"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      // 压缩css
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(), // 每次打包前清空
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.join(__dirname, "../src"),
      },
      {
        test: /\.(png|jp?eg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: false,
              name: "assets/images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: /src/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 公共路径
              // 默认情况下，使用的是webpackOptions.output中publicPath
              publicPath: "../",
              //开发环境配置热更新
              hmr: process.env.NODE_ENV === "development",
            },
          },
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[local]--[hash:base64:5]" },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 公共路径
              // 默认情况下，使用的是webpackOptions.output中publicPath
              publicPath: "../",
              //开发环境配置热更新
              hmr: process.env.NODE_ENV === "development",
            },
          },
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              // modules: { localIdentName: "[local]--[hash:base64:5]" },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
