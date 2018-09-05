const postcssImport = require('postcss-import');
const postcssCssNext = require('postcss-cssnext');
const postcssMixins = require('postcss-mixins');

const rule = {
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]___[local]___[hash:base64:5]',
                camelCase: true,
                url: true,
                import: true,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: [postcssImport, postcssMixins, postcssCssNext()],
            },
        },
    ],
};


module.exports = rule;
