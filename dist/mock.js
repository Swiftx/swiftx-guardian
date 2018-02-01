"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var mockjs_1 = require("mockjs");
var util_1 = require("util");
var Request = /** @class */ (function () {
    function Request() {
    }
    return Request;
}());
var Response = /** @class */ (function () {
    function Response() {
        /**
         * 设置状态
         * @type {number}
         */
        this.state = 200;
    }
    Object.defineProperty(Response.prototype, "data", {
        /**
         * 设置数据
         * @param {string | Object} value
         */
        set: function (value) {
            if (util_1.isString(value)) {
                this._data = value;
            }
            else {
                this._data = JSON.stringify(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Response.prototype.toJSON = function () {
        return JSON.stringify({
            state: this.state,
            data: this._data
        });
    };
    return Response;
}());
exports.api = function (option) {
    var request = new Request();
    var response = new Response();
    if (option instanceof Function) {
        option(request, response);
    }
    else {
        response.data = mockjs_1.mock(option);
    }
    process_1.stdout.write(response.toJSON());
};
