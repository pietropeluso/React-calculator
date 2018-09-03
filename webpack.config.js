var path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, './src');
const publicPath = path.join(__dirname, './public');

module.exports = {
    entry: path.join(srcPath, 'index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: publicPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: publicPath,
        hot: true
    }
};
