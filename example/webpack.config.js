const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool : 'eval-source-map',                // 生成站点地图
    entry :  path.resolve("./index.js"),    // 唯一入口文件
    output : {
        path : path.resolve("./public"),          // 打包后的文件存放的地方
        filename : "bundle.js"                  // 打包后输出文件的文件名
    },
    resolve: {
        extensions:  ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader:'ts-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'//添加对样式表的处理
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?modules'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // favicon:'./src/img/favicon.ico', //favicon路径
            filename : 'index.html',                  // 生成的html存放路径，相对于 path
            template :  path.resolve('./index.ejs'),  // html模板路径
            title: '店宝宝商家系统',         // 设置标题
            cache: true,                     // 开启缓存
            inject:true,                     // 允许插件修改哪些内容，包括head与body
            hash:true,                       // 为静态资源生成hash值
            minify:{
                removeComments:true,         // 移除HTML中的注释
                collapseWhitespace:false     // 删除空白符与换行符
            }
        })
    ]
};