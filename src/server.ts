import compiler from "./compiler";
import * as express from 'express';
import * as middleware from 'webpack-dev-middleware';
import { config } from "./config";
import { existsSync } from "fs";
import { execSync } from 'child_process';

export default function () {

    // 初始化服务器
    const server = express();
    server.use(middleware(compiler, {
        publicPath : '/',
        logLevel : 'error'
    }));

    // 设置根目录
    server.use(express.static(config.server.root));

    // 设置模拟接口
    server.all('*', function (req, res) {
        let apiFile = config.mocks.root+req.path+config.mocks.extension;
        if(!existsSync(apiFile)){
            res.send('404');
            return;
        }
        let output = JSON.parse(execSync(config.mocks.cmd+' '+apiFile).toString());
        res.set('Content-Type','text/json');
        res.send(output.data);
    });

    // 启动服务器并监听
    server.listen(config.server.port,()=>{
        //console.log('Dev Server Run Success : '+config.server.host+':'+config.server.port);
    });

};