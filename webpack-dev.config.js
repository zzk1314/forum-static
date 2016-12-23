var path = require("path")
var webpack = require("webpack")
var ip = require("ip")

module.exports = {
	devtool: "eval", // 增加开发速度
	entry: [
		"webpack-dev-server/client?http://" + ip.address() + ":4000",
		"webpack/hot/only-dev-server",
		"./src/index.tsx"
	],
	output: {
		path: path.join(__dirname, "__build__"),
		filename: "bundle.js",
		publicPath: "/",
		chunkFilename: "[id].chunk.js"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new webpack.HotModuleReplacementPlugin()
	],
  resolve: {
    root: path.resolve("./src"),
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
  },
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ["babel-loader", "ts-loader?transpileOnly=true"], exclude: /node_modules/ },
			{ test: /\.less$/, loader: "style!css!less" },
			{ test: /\.css$/, loader: "style!css?modules",include: /flexboxgrid/, },
      { test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=5000', exclude: /node_modules/ },
		]
	},
}
