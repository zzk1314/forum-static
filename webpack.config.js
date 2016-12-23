var path = require("path")
var webpack = require("webpack")

module.exports = {
	devtool: false, // 增加开发速度
	entry: [
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
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	resolve: {
		// alias: {
		// 	'react': 'react-lite',
		// 	'react-dom': 'react-lite'
		// },
		root: path.resolve("./src"),
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ["babel-loader", "ts-loader?transpileOnly=true"], exclude: /node_modules/ },
			{ test: /\.less$/, loader: "style!css!less" },
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000', exclude: /node_modules/ },
		]
	},
}
