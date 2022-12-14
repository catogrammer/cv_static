const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    entry: './src/index.js',

    devServer: {
        static: [path.join(__dirname, '..', 'build')],
        historyApiFallback: true
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },

    resolve: {
        alias: {
            images:  path.resolve(__dirname, "./src/imgs"),
            fonts:   path.resolve(__dirname, "./src/fonts"),
            favicon: path.resolve(__dirname, "./src/favicon")
        },
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
            },
            {
                test: /\.pug$/,
                use: [ "pug-loader", ],
            },
            {
                test: /\.(jp(e)?g|png|svg|ico)$/i,
                use : [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.(ttf)$/,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/cv-app.pug",
            filename: 'index.html',
        }),
        
        new MiniCssExtractPlugin({
            filename: '[name].style.css'
        }),

        new CleanWebpackPlugin(),
    ]
}