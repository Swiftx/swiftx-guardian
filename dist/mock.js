"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var Request = /** @class */ (function () {
    function Request(env) {
        this.method = env.HttpMethod.toUpperCase();
    }
    return Request;
}());
exports.Request = Request;
var Response = /** @class */ (function () {
    function Response() {
        this.first = true;
    }
    /**
     * 输出数据
     * @param {string | Object} value
     */
    Response.prototype.echo = function (value) {
        if (this.first)
            this.first = false;
        else
            process_1.stdout.write(',');
        process_1.stdout.write(JSON.stringify({
            Type: 'body',
            Content: value
        }));
    };
    return Response;
}());
exports.Response = Response;
exports.request = new Request(process_1.env);
exports.response = new Response();
