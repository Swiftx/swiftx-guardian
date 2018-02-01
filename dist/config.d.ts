export declare const projectRoot: string;
export interface LoaderType {
    extensions: Array<string>;
    loader: string;
    include?: string;
    exclude?: string;
}
export interface ConfigType {
    /**
     * 服务器配置
     */
    server: {
        host: string;
        port: number;
        root: string;
    };
    /**
     * 入口配置
     */
    entry: {
        main: string;
        favicon: string;
        index: string;
        title: string;
    };
    /**
     * 编译输出配置
     */
    output: {
        index: string;
        path: string;
        filename: string;
    };
    /**
     * 加载器配置
     */
    loaders: Array<LoaderType>;
    /**
     * 指定外部配置文件
     */
    webpack: boolean | string;
    /**
     * 模拟数据接口
     */
    mocks: {
        root: string;
        cmd: string;
    };
    /**
     * 调试选项配置
     */
    debug: {
        sourceMap: boolean;
    };
}
export declare const config: ConfigType;
