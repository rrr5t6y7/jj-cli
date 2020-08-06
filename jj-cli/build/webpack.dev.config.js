const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  /*入口*/
  // entry: path.join(__dirname, "../src/index.js"),

  entry: {
    app: [path.join(__dirname, "../src/index.js")],
    vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"],
  },

  mode: "development",

  devtool: "inline-source-map",

  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },

  resolve: {
    alias: {
      pages: path.join(__dirname, "../src/pages"),
      components: path.join(__dirname, "../src/components"),
      router: path.join(__dirname, "../src/router"),
      actions: path.join(__dirname, "../src/redux/actions"),
      reducers: path.join(__dirname, "../src/redux/reducers"),
      assets: path.join(__dirname, "../src/assets"),
      utils: path.join(__dirname, "../src/utils"),
      images: path.join(__dirname, "../src/images"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
    }),
    new CleanWebpackPlugin(), // 每次打包前清空
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // 压缩css
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true, // gzip压缩
    host: "127.0.0.1", // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    port: 9095, // 端口
    proxy: {
      // 配置服务代理
      "/wisdom-hr-api": {
        // target: "http://192.168.214.62:8011/", // 线上用
        // target: "http://192.168.163.152:8011/",

        target: "https://sit-wework.tianhong.cn/",

        pathRewrite: { "^/profile-api": "" }, //可转换
        changeOrigin: true,
      },
    },
  },

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
