let path = require('path');
module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"bundle.js",
        path:path.resolve("./dist")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
}