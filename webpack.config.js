// module.exports = {
//   module: {
//     loaders: [
//       {
//         test: /plugin\.css$/,
//         loaders: ["style-loader", "css"],
//       },
//     ],
//   },
// };

const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "app-bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /plugin\.css$\.tsx/,
        loaders: ["style-loader", "css"],
      }
    ]
  }
};
