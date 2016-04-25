module.exports = {
  context: __dirname,
  entry: "./lib/domAble.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "transpiled.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
  ]
  },
  devtool: 'source-map'
};
