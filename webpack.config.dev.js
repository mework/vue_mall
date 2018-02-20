// 导入 html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 导入 webpack
var webpack=require("webpack")

module.exports = {
	entry: './src/main.js',		// 打包的入口文件
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|eot|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4000		// 阀值
						}
					}
				]
			}
		]
	},
	plugins: [	// 插件中的内容都是 new出来的
		new HtmlWebpackPlugin({
			template: './template.html',		// 参考文件的路径
			filename: 'index.html'				// 要将html写入的文件名字
		}),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	]
}