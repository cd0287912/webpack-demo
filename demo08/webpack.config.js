let path = require('path');
let webpack = require("webpack");
var HtmlwebpackPlugin = require('html-webpack-plugin');
let OpenBrowserPlugin = require("open-browser-webpack-plugin");
module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"bundle.js",
        path:__dirname+"/dist"
    },
    plugins:[
        new HtmlwebpackPlugin({
            title:"webpack-demo",
            filename:"index.html"
        }),
        new OpenBrowserPlugin({
            url:"http://localhost:8080"
        })
    ]
}