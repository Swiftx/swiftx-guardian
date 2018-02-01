"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("./compiler");
var express = require("express");
var middleware = require("webpack-dev-middleware");
var config_1 = require("./config");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
function default_1() {
    // 初始化服务器
    var server = express();
    server.use(middleware(compiler_1.default, {
        publicPath: '/',
        logLevel: 'error'
    }));
    // 设置根目录
    server.use(express.static(config_1.config.server.root));
    // 设置模拟接口
    server.all('*', function (req, res) {
        var apiFile = config_1.config.mocks.root + req.path + config_1.config.mocks.extension;
        if (!fs_1.existsSync(apiFile)) {
            res.send('404');
            return;
        }
        var output = JSON.parse(child_process_1.execSync(config_1.config.mocks.cmd + ' ' + apiFile).toString());
        res.set('Content-Type', 'text/json');
        res.send(output.data);
    });
    // 启动服务器并监听
    server.listen(config_1.config.server.port, function () {
        //console.log('Dev Server Run Success : '+config.server.host+':'+config.server.port);
    });
}
exports.default = default_1;
;
