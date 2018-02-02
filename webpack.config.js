const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, "./src/app.js"),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            path: __dirname + '/dist',
            inject: true,
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin() // 热替换
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: ['url-loader']
        }]
    },
    devServer: {
        host: "localhost",
        port: 8080,
        setup(app) {
            app.get('/data', (req, res) => {
                let pathname = path.join(__dirname, "data/data.json");
                fs.readFile(pathname, (err, data) => {
                    if (err) {
                        res.end(err)
                    }
                    res.end(data)
                })
            })
        }
    }
}