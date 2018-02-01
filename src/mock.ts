import { stdout } from 'process';
import { mock } from 'mockjs';
import { isString } from "util";

class Request {

}

class Response {

    /**
     * 设置状态
     * @type {number}
     */
    public state : number = 200;

    protected _data  : string;

    /**
     * 设置数据
     * @param {string | Object} value
     */
    public set data(value:string|Object) {
        if(isString(value)){
            this._data = value;
        } else {
            this._data = JSON.stringify(value);
        }
    }

    public toJSON(){
        return JSON.stringify({
            state : this.state,
            data : this._data
        })
    }

}

export const api = function (option : Object|Function) {
    let request : Request = new Request();
    let response : Response = new Response();
    if(option instanceof Function){
        option(request, response);
    } else {
        response.data = mock(option);
    }
    stdout.write(response.toJSON());
};