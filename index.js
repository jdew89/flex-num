const FlexNum = require('./FlexNum');

let mynum = new FlexNum(Number.MAX_SAFE_INTEGER);

let n = Number.MAX_SAFE_INTEGER;

let x = new FlexNum(12);
let y = new FlexNum(x);

y.plus(Number.MAX_SAFE_INTEGER + 2);

console.log(x.toString());
console.log(y.toString());


//console.log(mynum.toString());
