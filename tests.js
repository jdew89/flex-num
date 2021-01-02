const FlexNum = require('./FlexNum');


//***Testing Addition***
console.log("\nADD\n");

//Big plus Big
let x = new FlexNum(11111111111111111111n);
let y = 1n;

x.plus(y);
console.log(x.toString());

//Big plus little
x = new FlexNum(11111111111111111111n);
y = 2;

x.plus(y);
console.log(x.toString());

//little plus big
x = new FlexNum(3.1);
y = 11111111111111111111n;

x.plus(y);
console.log(x.toString());

//little plus little
x = new FlexNum(1.1);
y = 1;

x.plus(y);
console.log(x.toString());

//flex plus flex
x = new FlexNum(4);
y = new FlexNum(11111111111111111111n);

x.plus(y);
console.log(x.toString());


// ******
//Testing Subtraction
// ******

console.log("\nMINUS\n");

//Big minus Big
x = new FlexNum(11111111111111111111n);
y = 1n;

x.minus(y);
console.log(x.toString());

//Big minus little
x = new FlexNum(11111111111111111111n);
y = 2.2;

x.minus(y);
console.log(x.toString());

//little minus big
x = new FlexNum(3.1);
y = 11111111111111111111n;

x.minus(y);
console.log(x.toString());

//little minus little
x = new FlexNum(1.1);
y = 1;

x.minus(y);
console.log(x.toString());

//flex minus flex
x = new FlexNum(4);
y = new FlexNum(1);

x.minus(y);
console.log(x.toString());