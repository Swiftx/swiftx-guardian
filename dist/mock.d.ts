export declare class Request {
    method: string;
    constructor(env: any);
}
export declare class Response {
    protected first: boolean;
    /**
     * 输出数据
     * @param {string | Object} value
     */
    echo(value: string | Object): void;
}
export declare const request: Request;
export declare const response: Response;
