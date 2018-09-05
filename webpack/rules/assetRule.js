const rule = {
    test: /\.(png|svg|jpg|gif|ttf|eot|svg|woff|woff2)$/,
    use: [{
        loader: 'file-loader',
    }],
};

module.exports = rule;
