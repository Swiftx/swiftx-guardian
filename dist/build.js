"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var compiler_1 = require("./compiler");
compiler_1.default.apply(new webpack_1.ProgressPlugin());
function default_1() {
    compiler_1.default.run(function (err, stats) {
        if (err === null) {
            console.log('webpack compiler success! time cost: ' + (stats['endTime'] - stats['startTime'] + 'ms'));
        }
        else {
            console.log('webpack compiler error:');
            console.log(err);
        }
    });
}
exports.default = default_1;
;
