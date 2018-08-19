let path = require("path");
module.exports = {
    entry:{
        bundle1:'./src/main1.js',
        bundle2:'./src/main2.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('./dist')
    }
}