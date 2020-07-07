/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(jsx?)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
            { test: /\.(jpg|jpeg|gif|png)$/, use: 'file-loader', exclude: /node_modules/ },
            // AirBnB date picker style
            { test: /react-dates[\\/].*\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './index.html'
        }),
        //        new Dotenv({
        //            path: './.env', 
            //safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        //        })
    ],

    // serve index.html in place of browser's 404 responses
    devServer: {
        inline: true,
        historyApiFallback: true
    }
};
