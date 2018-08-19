let path = require('path');
let webpack = require('webpack');
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"bundle.js",
        path:__dirname+"/dist"
    },
    plugins:[
        new UglifyJsPlugin()
    ]
}