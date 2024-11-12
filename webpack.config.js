const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: 'umd',
  },
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()], // Исключаем node_modules из сборки
  module: {
    rules: [
      {
        test: /\.(js|mjs|cjs|jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "unambiguous",
            babelrc: false,
            configFile: false,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "38",
                  },
                  useBuiltIns: "entry",
                  corejs: "3.33.2",
                },
              ],
              "@babel/preset-typescript",
            ],
            exclude: "node_modules/core-js",
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: (resPath) => resPath.includes(".module."),
                localIdentName: "[hash:base64:8]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern",
            },
          },
        ],
      },
    ],
  },
};
