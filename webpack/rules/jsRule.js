const rule = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
};

module.exports = rule;