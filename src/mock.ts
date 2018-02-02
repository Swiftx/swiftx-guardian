import { stdout, env } from 'process';

export class Request {

    public method: string;

    public constructor(env) {
        this.method = env.HttpMethod.toUpperCase();
    }

}


export class Response {

    protected first:boolean = true;

    /**
     * 输出数据
     * @param {string | Object} value
     */
    public echo(value: string|Object):void{
        if(this.first) this.first = false;
        else stdout.write(',');
        stdout.write(JSON.stringify({
            Type : 'body',
            Content : value
        }));
    }

}

export const request : Request = new Request(env);
export const response : Response = new Response();