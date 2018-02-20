// 导入 html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 导入path模块
const path = require('path')

// 打包之前删除 dist 目录
var CleanWebpackPlugin = require('clean-webpack-plugin')

// 剥离 css 文件插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 导入 webpack
var webpack=require("webpack")

module.exports = {
    entry: {
        // 属性名称代表的是，打包出来，放在js文件夹下面的文件名称，值是代表第三方包
        'axios':['axios'], //属性名称代表的是 打包出来，放在js文件夹下面的文件名称，值是代表第三方包
        'jquery':['jquery'],
        'moment':['moment'],
        'v-distpicker':['v-distpicker'],
        'vue-lazyload':['vue-lazyload'],
        'quanjiatong':['vue','vue-router','vuex'],
        'bundle.js': './src/main.js'	// 自己的源代码也需要打包进 bundle.js
    },		// 打包的入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 添加 filename， 这个 name 就是上面的属性名称
        filename: 'js/[name].js'
    },
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
				use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            minimize: true	// 压缩抽离出来的css文件
                        }
                    }
                })
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|eot|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
                            limit: 2000,		// 阀值
                            name: 'statics/[name]-[hash:5].[ext]'
						}
					}
				]
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" 
            }
		]
	},
    plugins: [	// 插件中的内容都是 new出来的
        new CleanWebpackPlugin('dist'),
        new ExtractTextPlugin("static/css/styles.css"),
		new HtmlWebpackPlugin({
			template: './template.html',		// 参考文件的路径
            filename: 'index.html',				// 要将html写入的文件名字
            minify: {
                removeComments: true,	    // 删除注释
                minifyJS: true,			    // 压缩 index.html 中的js
                minifyCSS: true,		    // 压缩 index.html 中的css
                collapseWhitespace: true	// 去除空格
            }
		}),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
        }),
        // 设置当前环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 设置压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,	// 去除警告
                drop_debugger: true,
                drop_console: true	// 去除 console.log
            },
            comments: false	// 去掉版权信息等注释
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['axios','jquery', 'moment','v-distpicker','vue-lazyload','quanjiatong'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)
            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        })
	]
}