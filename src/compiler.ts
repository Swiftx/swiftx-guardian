import * as fs from 'fs';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { HotModuleReplacementPlugin, Configuration } from 'webpack';
import { projectRoot, config as userConfig } from './config';

// 加载用户默认配置
const loadersConfig:Array<any> = [];
const pluginConfig : Array<any> = [];
let config:Configuration = {
    resolve: { extensions:['.tsx', '.ts', '.js', '.jsx'] },
    module: { loaders: loadersConfig},
    plugins: pluginConfig
};

// 配置编译信息
config.entry = resolve(projectRoot, userConfig.entry.main);

// 配置输出信息
config.output = {
    path : resolve(projectRoot, userConfig.output.path),
    filename : userConfig.output.filename
};

// 资源地图生成
if(userConfig.debug.sourceMap)
    config.devtool = 'eval-source-map';

// 配置加载器
for(let loader of userConfig.loaders){
    let ext = loader.extensions.join('|');
    let loaderConfig = {
        test : new RegExp('\\.('+ext+')$'),
        loader : loader.loader
    };
    if('include' in loader)
        loaderConfig['include'] = new RegExp(<string>loader.include);
    if('exclude' in loader)
        loaderConfig['exclude'] = new RegExp(<string>loader.exclude);
    loadersConfig.push(loaderConfig);
}

// 配置插件
pluginConfig.push(new HotModuleReplacementPlugin());
pluginConfig.push( new HtmlWebpackPlugin({
    favicon : resolve(projectRoot, userConfig.entry.favicon),
    filename : userConfig.output.index,
    template : resolve(projectRoot, userConfig.entry.index),
    title: userConfig.entry.title,
    cache: true,                     // 开启缓存
    inject:true,                     // 允许插件修改哪些内容，包括head与body
    hash:true,                       // 为静态资源生成hash值
    minify:{
        removeComments:true,         // 移除HTML中的注释
        collapseWhitespace:false     // 删除空白符与换行符
    }
}));

// 读取用户自定义配置
if(userConfig.webpack !== false){
    let configFile = projectRoot+'/'+'webpack.config.js';
    if(userConfig.webpack !== true)
        configFile = resolve(projectRoot, userConfig.webpack);
    if(fs.existsSync(configFile))
        config = require(configFile);
}

// 导出编译配置内容
export default webpack(config);