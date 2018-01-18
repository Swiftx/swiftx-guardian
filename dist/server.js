"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("./compiler");
var express = require("express");
var middleware = require("webpack-dev-middleware");
var config_1 = require("./config");
function default_1() {
    // 初始化服务器
    var server = express();
    server.use(middleware(compiler_1.default, {
        publicPath: '/'
    }));
    // 启动服务器并监听
    server.listen(config_1.config.server.port);
}
exports.default = default_1;
;
