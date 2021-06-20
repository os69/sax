const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		tt_test: './test/testAll.js',
		sampletree1: './samples/sampletree1/tree.jsx',
		sampletree2: './samples/sampletree2/tree.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: '[id].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		//	contentBase: path.join(__dirname, 'dist'),
		//	publicPath: '/assets/',
		compress: true,
		port: 50010
	}
};