"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path_1 = require("path");
var webpack_1 = require("webpack");
var config_1 = require("./config");
// 加载用户默认配置
var loadersConfig = [];
var pluginConfig = [];
var config = {
    resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
    module: { loaders: loadersConfig },
    plugins: pluginConfig
};
// 配置编译信息
config.entry = path_1.resolve(config_1.projectRoot, config_1.config.entry.main);
// 配置输出信息
config.output = {
    path: path_1.resolve(config_1.projectRoot, config_1.config.output.path),
    filename: config_1.config.output.filename
};
// 资源地图生成
if (config_1.config.debug.sourceMap)
    config.devtool = 'eval-source-map';
// 配置加载器
for (var _i = 0, _a = config_1.config.loaders; _i < _a.length; _i++) {
    var loader = _a[_i];
    var ext = loader.extensions.join('|');
    var loaderConfig = {
        test: new RegExp('\\.(' + ext + ')$'),
        loader: loader.loader
    };
    if ('include' in loader)
        loaderConfig['include'] = loader.include;
    if ('exclude' in loader)
        loaderConfig['exclude'] = new RegExp(loader.exclude);
    loadersConfig.push(loaderConfig);
}
// 配置插件
pluginConfig.push(new webpack_1.HotModuleReplacementPlugin());
pluginConfig.push(new HtmlWebpackPlugin({
    favicon: path_1.resolve(config_1.projectRoot, config_1.config.entry.favicon),
    filename: config_1.config.output.index,
    template: path_1.resolve(config_1.projectRoot, config_1.config.entry.index),
    title: config_1.config.entry.title,
    cache: true,
    inject: true,
    hash: true,
    minify: {
        removeComments: true,
        collapseWhitespace: false // 删除空白符与换行符
    }
}));
// 读取用户自定义配置
if (config_1.config.webpack !== false) {
    var configFile = config_1.projectRoot + '/' + 'webpack.config.js';
    if (config_1.config.webpack !== true)
        configFile = path_1.resolve(config_1.projectRoot, config_1.config.webpack);
    if (fs.existsSync(configFile))
        config = require(configFile);
}
// 导出编译配置内容
exports.default = webpack(config);
