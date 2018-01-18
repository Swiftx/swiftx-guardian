#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var build_1 = require("./build");
var server_1 = require("./server");
// 获取命令行参数
var cmdArgs = process.argv.splice(2);
// 执行指令操作
switch (cmdArgs[0]) {
    case 'build':
        build_1.default();
        break;
    case 'server':
        server_1.default();
        break;
    default: build_1.default();
}
