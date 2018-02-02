import compiler from "./compiler";
import * as express from 'express';
import * as middleware from 'webpack-dev-middleware';
import { config } from "./config";
import { existsSync } from "fs";
import { execSync } from 'child_process';
import {env} from "process";

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
        let cmd = config.mocks.exec+' '+config.mocks.index;
        let newEnv = Object.assign({}, env);
        newEnv.HttpMethod = req.method;
        let processOutput = execSync(cmd,{env  : newEnv}).toString();
        let output = JSON.parse('['+processOutput+']');
        res.set('Content-Type','text/json');
        let resBody = '';
        for(let message of output){
            if(message.Type === 'body')
                resBody += message.Content;
        }
        res.send(resBody);
    });

    // 启动服务器并监听
    server.listen(config.server.port,()=>{
        //console.log('Dev Server Run Success : '+config.server.host+':'+config.server.port);
    });

};