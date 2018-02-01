import * as process from "process";
import * as fs from "fs";
import { resolve } from 'path';
import * as merge from "deepmerge";

// 当前执行所在目录
export const projectRoot = process.cwd();

export interface LoaderType {
    extensions : Array<string>;
    loader : string;
    include? : string;
    exclude? : string;
}

export interface ConfigType {

    /**
     * 服务器配置
     */
    server : {
        host : string;
        port : number;
        root : string;
    };

    /**
     * 入口配置
     */
    entry : {
        main : string;
        favicon : string;
        index : string;
        title : string;
    };

    /**
     * 编译输出配置
     */
    output : {
        index : string;
        path : string;
        filename : string;
    };

    /**
     * 加载器配置
     */
    loaders : Array<LoaderType>;

    /**
     * 指定外部配置文件
     */
    webpack : boolean|string;

    /**
     * 模拟数据接口
     */
    mocks : {
        root : string;
        extension : string;
        cmd  : string;
    }

    /**
     * 调试选项配置
     */
    debug : {
        sourceMap : boolean;
    };

}

// 用户默认配置项
const defaultConfig:ConfigType = {
    server : {
        host : 'localhost',
        port : 3000,
        root : "public"
    },
    entry : {
        main : 'src/index.js',
        favicon : resolve(__dirname,'../src/favicon.ico'),
        index : resolve(__dirname,'../src/template.ejs'),
        title : "index",
    },
    output : {
        index : "index.html",
        path : "dist",
        filename : "main.js"
    },
    loaders : [
        {
            extensions : ['ts', 'tsx'],
            loader : 'ts-loader'
        },
        {
            extensions : ['js', 'jsx'],
            loader : 'babel-loader',
            exclude: 'node_modules'
        },
        {
            extensions : ['css'],
            loader : 'style-loader!css-loader?modules',
            exclude: 'node_modules'
        },
        {
            extensions : ['css'],
            loader : 'style-loader!css-loader',
            include: 'node_modules'
        },
        {
            extensions : ['less'],
            loader : 'style-loader!css-loader!less-loader?modules'
        },
        {
            extensions : ['png','jpg', 'gif'],
            loader : 'url-loader?limit=8192&name=./static/img/[hash].[ext]'
        }
    ],
    webpack : false,
    debug : {
        sourceMap : false
    },
    mocks : {
        root : "./mock",
        extension : ".js",
        cmd  : "node"
    }
};

// 加载用户配置
let userConfig = {};
if(fs.existsSync(projectRoot+'/'+'guardian.json'))
    userConfig = JSON.parse(fs.readFileSync(projectRoot+'/'+'guardian.json').toString());

// 合并用户配置到
export const config:ConfigType = merge(defaultConfig, userConfig);
config.server.root = resolve(projectRoot, config.server.root);
config.mocks.root = resolve(projectRoot, config.mocks.root);