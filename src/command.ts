#!/usr/bin/env node
import * as process from 'process';
import build from './build';
import server from './server';

// 获取命令行参数
const cmdArgs = process.argv.splice(2);

// 执行指令操作
switch (cmdArgs[0]){
    case 'build':
        build();break;
    case 'server':
        server();break;
    default: build();
}