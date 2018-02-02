"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var fs = require("fs");
var path_1 = require("path");
var merge = require("deepmerge");
// 当前执行所在目录
exports.projectRoot = process.cwd();
// 用户默认配置项
var defaultConfig = {
    server: {
        host: 'localhost',
        port: 3000,
        root: "public"
    },
    entry: {
        main: 'src/index.js',
        favicon: path_1.resolve(__dirname, '../src/favicon.ico'),
        index: path_1.resolve(__dirname, '../src/template.ejs'),
        title: "index",
    },
    output: {
        index: "index.html",
        path: "dist",
        filename: "main.js"
    },
    loaders: [
        {
            extensions: ['ts', 'tsx'],
            loader: 'ts-loader'
        },
        {
            extensions: ['js', 'jsx'],
            loader: 'babel-loader',
            exclude: 'node_modules'
        },
        {
            extensions: ['css'],
            loader: 'style-loader!css-loader?modules',
            exclude: 'node_modules'
        },
        {
            extensions: ['css'],
            loader: 'style-loader!css-loader',
            include: 'node_modules'
        },
        {
            extensions: ['less'],
            loader: 'style-loader!css-loader!less-loader?modules'
        },
        {
            extensions: ['png', 'jpg', 'gif'],
            loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]'
        }
    ],
    webpack: false,
    debug: {
        sourceMap: false
    },
    mocks: {
        index: "./mock.js",
        exec: "node"
    }
};
// 加载用户配置
var userConfig = {};
if (fs.existsSync(exports.projectRoot + '/' + 'guardian.json'))
    userConfig = JSON.parse(fs.readFileSync(exports.projectRoot + '/' + 'guardian.json').toString());
// 合并用户配置到
exports.config = merge(defaultConfig, userConfig);
exports.config.server.root = path_1.resolve(exports.projectRoot, exports.config.server.root);
exports.config.mocks.index = path_1.resolve(exports.projectRoot, exports.config.mocks.index);
