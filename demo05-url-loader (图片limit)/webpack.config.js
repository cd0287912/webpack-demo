let path = require('path');
module.exports = {
    entry:__dirname + '/src/main.js',
    output:{
        filename:"bundle.js",
        path:__dirname+'/dist'
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:81920
                        }
                    }
                ]
            }
        ]
    }
}