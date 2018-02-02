"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("./compiler");
var express = require("express");
var middleware = require("webpack-dev-middleware");
var config_1 = require("./config");
var child_process_1 = require("child_process");
var process_1 = require("process");
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
        var cmd = config_1.config.mocks.exec + ' ' + config_1.config.mocks.index;
        var newEnv = Object.assign({}, process_1.env);
        newEnv.HttpMethod = req.method;
        var processOutput = child_process_1.execSync(cmd, { env: newEnv }).toString();
        var output = JSON.parse('[' + processOutput + ']');
        res.set('Content-Type', 'text/json');
        var resBody = '';
        for (var _i = 0, output_1 = output; _i < output_1.length; _i++) {
            var message = output_1[_i];
            if (message.Type === 'body')
                resBody += message.Content;
        }
        res.send(resBody);
    });
    // 启动服务器并监听
    server.listen(config_1.config.server.port, function () {
        //console.log('Dev Server Run Success : '+config.server.host+':'+config.server.port);
    });
}
exports.default = default_1;
;
