import compiler from "./compiler";
import * as express from 'express';
import * as middleware from 'webpack-dev-middleware';
import { config } from "./config";

export default function () {

    // 初始化服务器
    const server = express();
    server.use(middleware(compiler, {
        publicPath : '/'
    }));

    // 启动服务器并监听
    server.listen(config.server.port);

};