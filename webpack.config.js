const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './index.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: 'production',
};
