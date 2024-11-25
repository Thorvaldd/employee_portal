const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.js",
    resolve: {
      extensions: ['.tsx', '.js', '.jsx', '.ts']
    },
    devServer: {
      historyApiFallback: true,
      port: env.PORT || 4001,
      allowedHosts: "all",
      proxy: [
        {
          context: ["/api"],
          target:
            process.env.services__employeeapi__https__0 ||
            process.env.services__employeeapi__http__0,
          pathRewrite: { "^/api": "/api/v1" },
          secure: false,
          logLevel: "debug"
        },
      ],
    },
    output: {
      path: `${__dirname}/dist`,
      filename: "bundle.js",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/favicon.ico",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|tsx|jsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript"
              ],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader']
        }
      ],
    },
  };
};