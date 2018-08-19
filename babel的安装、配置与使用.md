### babel的安装、配置与使用

##### 1.安装`babel-loader` `babel-core` ` babel-preset-env`

```javascript
npm install -D babel-loader babel-core babel-preset-env
```

-  `babel-loader`

`babel-loader`作为`webpack`的`loader`的一种,作用同其他`loader`一样,实现对特定文件类型的处理

> loader 让 `webpack` 能够去处理那些非 JavaScript 文件（`webpack `自身只理解  JavaScript）。loader 可以将所有类型的文件转换为` webpack` 能够处理的有效模块，然后你就可以利用 `webpack`的打包能力，对它们进行处理。 

- `babel-core`

`babel-core`的作用在于提供一系列的`api`,当`webpack`使用`babel-loader`处理文件时,`babel-loader`实际上调用了`babel-core`的`api`

- `babel-preset-env`

`babel-preset-env`是告诉`babel`使用哪种转码规则进行文件处理

##### 2.配置babel规则

- 第一种方式,通过`package.json`,在`package.json`文件中增加一个`babel`属性,作用是设置项目中的babel转码规则和使用到的`babel`插件，其基本格式如下： 

```json
"babel":{
  "presets": [],
  "plugins": []
}
```

`”presets”`属性字段设定转码规则，`”plugins”`属性设置使用到的插件。在本项目中只需将`”babel”`属性 的`”presets”`:设置为`[“env”]`即可，如下所示： 

```json
"babel":{
  "presets": ["env"]
}
```

上面的设置告诉`npm`本项目将使用`babel`，并且使用`bable-preset-env`规则进行转码，即实现对`ES2015+`语法进行转码.

- 第二种方式,即通过`.babelrc`文件, 在项目根目录下新建`.babelrc`文件，里面只需输入第一种方式中`”babel”`属性的值即可： 

```
{
  "presets": ["env"]
}
```

##### 3.建立并配置`webpack.config.js`文件

仅有上面仍然不能起作用，虽然上面已经配置好`babel`的规则，但`webpack`仍然不知道何时使用该规则，这便需要使用`webpack.config.js`文件。 

如果想要进行更加个性化的打包配置，仍然要使用该文件。在根目录下新建`webpack.config.js`文件，在其中输入： 

```js
module.exports={
    module:{
        rules:[
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            }
        ]
    }

}
```

这就告诉`webpack`打包时，一旦匹配到`.js`文件就使用babel-loader进行处理，如前文所述，`babel-loader`调用`babel-core`的`api`使用`bable-preset-env`的规则进行转码。 

##### 4.运行查看结果

假使你已经在`package.json`文件的`"scripts"`属性下增加了`"build"`属性，即 

```
"build": "webpack --mode production --progress --display-modules --colors --display-reasons"
```

现在，在命令行定位到项目根目录，执行 

```
npm run build
```

这就相当于执行`"build"`属性对应的脚本