import { ProgressPlugin } from 'webpack';
import compiler from './compiler';

compiler.apply(new ProgressPlugin());
export default function () {
    compiler.run((err, stats) => {
        if(err === null){
            console.log('webpack compiler success! time cost: '+(stats['endTime']-stats['startTime'] + 'ms'));
        } else {
            console.log('webpack compiler error:');
            console.log(err);
        }
    });
};
