"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    devtool: 'eval-source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
exports.default = config;
