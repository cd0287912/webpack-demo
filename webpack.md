# `webpack`

### 安装：

- 初始化

```
npm install -y
```

- 全局安装

```
npm install webpack -g
```

- 本地安装	

```
npm install webpack webpack-cli -D
```

##### 在`webpack`中所有文件都是模块

- `js`模块 模块化（`AMD CMD es6Module commonjs`）;

### 1.基于零配置，直接运行`webpack`

会执行node_modules对应的bin下的`webpack.cmd`

```
npx webpack
```

### 2.有配置

- 配置文件`webpack.config.js`   基于node 遵循`commonjs`规范

```javascript
//基于node 遵循commonjs规范
let path = require('path');
module.exports = {
    entry:'./src/index.js',          //入口
    output:{
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               //出口
    devServer:{},                    //开发服务器
    module:{},                       //模块配置
    plugins:[],                      //插件的配置
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

1.在webpack中如何配置开发服务器 

```
npm install webpack-dev-server -D
```

2.在``package.json`` 文件中`scripts`里配置脚本(快捷键)

```javascript
  "scripts": {
    "build": "webpack",
    "dev":"webpack-dev-server"
  },
```

`npm run dev`启动服务 不会真的生成一个文件 （内存中打包）

```javascript
//基于node 遵循commonjs规范
let path = require('path');
module.exports = {
    entry:'./src/index.js',          //入口
    output:{                         //出口
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true                    //自动打开浏览器
    },                              
    module:{},                       //模块配置
    plugins:[],                      //插件的配置
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

3.`webpack`插件将html打包到build下可以自动引入生产的js

`html-webpack-plugin`插件

```
npm install html-webpack-plugin -D
```

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',          //入口
    output:{                         //出口
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true                    //自动打开浏览器
    },                              
    module:{},                       //模块配置
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',   //自动关联打包后的js
            title:'初学webpack 4.0',        //添加标题 ejs语法
            // minify:{                          //压缩
            //     removeAttributeQuotes:true,   //删除双引号
            //     collapseWhitespace:true,       //折叠空行
            // },
            hash:true                        //hash数  可以清楚缓存
        }),
        
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

`clean-webpack-pligin`插件

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:'./src/index.js',          //入口
    output:{                         //出口
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true                    //自动打开浏览器
    },                              
    module:{},                       //模块配置
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            // minify:{                          //压缩
            //     removeAttributeQuotes:true,   //删除双引号
            //     collapseWhitespace:true,      //折叠空行
            // },
            hash:true                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build'])     //删除重新生成
        
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

4.

- 多个入口文件=>entry为一个数组

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    //entry:'./src/index.js',                       //单个入口 (单个js引入一个单页index.html))
    entry:['./src/index.js','./src/a.js'],          //多个入口 (多个js引入一个单页index.html)
    output:{                                        //出口
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true                    //自动打开浏览器
    },                              
    module:{},                       //模块配置
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            // minify:{                          //压缩
            //     removeAttributeQuotes:true,   //删除双引号
            //     collapseWhitespace:true,      //折叠空行
            // },
            hash:true                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build'])     //删除重新生成
        
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

- 多页`（index.js=>index.html）（a.js=>a.html）` entry则为一个对象 同时多个`new HtmlWebpackplugin`

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:{
        index:'./src/index.js',
        a:'./src/a.js'
    },
    output:{                         //多个入口配置多个出口              
        filename:'[name].js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true                    //自动打开浏览器
    },                              
    module:{},                       //模块配置
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            filename:'a.html',
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
            chunks:['a']
        }),
        new HtmlWebpackPlugin({      //打包html插件
            filename:'b.html',
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
            chunks:["index"]
        }),
        new CleanWebpackPlugin(['./build'])     //删除重新生成
        
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

5. 热更新

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
//热更新 webpack自带的功能 不需要安装其他插件
let webpack = require('webpack');
module.exports = {
    entry:'./src/index.js',
    output:{                              
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true,                    //自动打开浏览器
        hot:true                      //热更新
    },                              
    module:{},                       //模块配置
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build']),     //删除重新生成
        new webpack.HotModuleReplacementPlugin()   //配置热更新
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
}
```

```javascript
let str = require('./a.js')
document.getElementById("app").innerHTML = str;
if(module.hot){
    //方法1：
    // module.hot.accept('./a.js',function(){
    //     let str = require('./a.js')
    //     document.getElementById("app").innerHTML = str;
    // })
    //方法2：
    module.hot.accept();
}
```

## webpack 两大核心:

`plugin ↑`    插件

`loader ↓`    模块

####css处理:

```
npm install style-loader css-loader less less-loader -D
```

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
//热更新 webpack自带的功能 不需要安装其他插件
let webpack = require('webpack');
module.exports = {
    entry:'./src/index.js',
    output:{                              
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true,                    //自动打开浏览器
        hot:true                      //热更新
    },                              
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build']),     //删除重新生成
        new webpack.HotModuleReplacementPlugin()   //配置热更新
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
    module:{                         //模块配置
        rules:[
            {test:/\.css$/,use:[
                {loader:'style-loader'},
                {loader:'css-loader'}
                ]
            },
            {test:/\.less$/,use:[
                {loader:'style-loader'},
                {loader:'css-loader'},
                {loader:'less-loader'}
                ]
            }
        ]
    },                       
}
```

```javascript
//入口文件引入源文件
import "./index.css"
import "./index.less"
let str = require('./a.js')
document.getElementById("app").innerHTML = str;
if(module.hot){
    //方法1：
    // module.hot.accept('./a.js',function(){
    //     let str = require('./a.js')
    //     document.getElementById("app").innerHTML = str;
    // })
    //方法2：
    module.hot.accept();
}
```

以上是解析的css直接引入到了html里的style标签里面，这样不好，所以我们会抽离样式

抽离样式,抽离到一个css文件,通过css文件的方式外部引用

```
npm install extract-text-webpack-plugin@next  mini-css-extract-plugin -D
```

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
//热更新 webpack自带的功能 不需要安装其他插件
let webpack = require('webpack');
//css引入外部文件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{                              
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true,                    //自动打开浏览器
        hot:true                      //热更新
    },                              
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build']),     //删除重新生成
        new webpack.HotModuleReplacementPlugin(),   //配置热更新
        new ExtractTextWebpackPlugin({            //css引入外部文件 插件配置
            filename:'css/index.css'
        })
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
    module:{                         //模块配置
        rules:[
            {test:/\.css$/,use:ExtractTextWebpackPlugin.extract({
                use:[
                    {loader:'css-loader'},
                ]
            })
            },
            {test:/\.less$/,use:ExtractTextWebpackPlugin.extract({
                use:[
                    {loader:'css-loader'},
                ]
            })
            }
        ]
    },                       
}
```

抽离多个文件 => index.less->less.css    index.css->css.css

```javascript
//基于node 遵循commonjs规范
//引入路径
let path = require('path');
//引入插件html-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');
//引入插件clean-webpack-plugin
let CleanWebpackPlugin = require('clean-webpack-plugin');
//热更新 webpack自带的功能 不需要安装其他插件
let webpack = require('webpack');
//css引入外部文件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//分别抽离
let lessExtrat = new ExtractTextWebpackPlugin('css/less.css')
let cssExtrat = new ExtractTextWebpackPlugin('css/css.css')
module.exports = {
    entry:'./src/index.js',
    output:{                              
        filename:'build.js',
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },                               
    devServer:{                      //开发服务器
        contentBase:'./build',       //以左边的文件夹为服务启动的
        port:3000,
        compress:true,               //服务器压缩
        open:true,                    //自动打开浏览器
        hot:true                      //热更新
    },                              
    plugins:[                        //插件的配置
        new HtmlWebpackPlugin({      //打包html插件
            template:'./src/index.html',         //自动关联打包后的js
            title:'初学webpack 4.0',             //添加标题 ejs语法
            hash:true,                            //hash数  可以清楚缓存
        }),
        new CleanWebpackPlugin(['./build']),     //删除重新生成
        new webpack.HotModuleReplacementPlugin(),   //配置热更新
        lessExtrat,                                 //分别配置
        cssExtrat
    ],                      
    mode:'development',              //可以更改模式
    resolve:{},                      //配置解析
    module:{                         //模块配置
        rules:[
            {test:/\.css$/,use:cssExtrat.extract({
                use:[
                    {loader:'css-loader'},
                ]
            })
            },
            {test:/\.less$/,use:lessExtrat.extract({
                use:[
                    {loader:'css-loader'},
                ]
            })
            }
        ]
    },                       
}
```

