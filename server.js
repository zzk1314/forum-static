var chalk = require("chalk")
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server")
var devConfig = require("./webpack-dev.config")

var PROXY = process.env.PROXY

var serverConfig = {
  publicPath: devConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,

  watchOptions: {
    aggregateTimeout: 300,
    pool: true
  },

  stats: {
    colors: true,
    timings: true,
    chunks: false   // less verbose, disable chunk information output
  },
}

// 所有的配置 https://github.com/nodejitsu/node-http-proxy#options
if (Boolean(PROXY)) {
  serverConfig.proxy = {
    "/": (function() {
        var config = {
          target: PROXY,
          secure: false,
          bypass: function(req) {
            if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
              console.log(chalk.cyan("Bypass the proxy - " + req.headers.accept));
              return "/index.html";
            }
          }
        }
      return config
    })(),
  }
}

new WebpackDevServer(webpack(devConfig), serverConfig).listen(4000, "0.0.0.0", function(err, result) {
  if (err) {
    console.log(err);
  }

  console.log(chalk.cyan("开发服务器启动完毕 http://0.0.0.0:4000, 请等待 webpack 编译完成"));
})
