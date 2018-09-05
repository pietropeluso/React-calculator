var path = require('path');
const webpack = require('webpack');

const jsRule = require('./webpack/rules/jsRule');
const cssRule = require('./webpack/rules/cssRule');
const assetRule = require('./webpack/rules/assetRule');

const srcPath = path.join(__dirname, './src');
const publicPath = path.join(__dirname, './public');


module.exports = {
    entry: path.join(srcPath, 'index.js'),
    module: {
        rules: [
            jsRule,
            cssRule,
            assetRule,
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
