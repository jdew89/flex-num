const FlexNum = require('./FlexNum');


//***Testing Addition***
console.log("\n***********PLUS***********");

//Big plus Big
let x = new FlexNum(11111111111111111111n);
let y = 11111111111111111111n;

x.plus(y);
console.log("\nExpected output: 22222222222222222222n");
console.log(x.toString());

//Big plus little
x = new FlexNum(11111111111111111111n);
y = -2;

x.plus(y);
console.log("\nExpected output: 11111111111111111109n");
console.log(x.toString());

//little plus big
x = new FlexNum(3.1);
y = 11111111111111111111n;

x.plus(y);
console.log("\nExpected output: 11111111111111111114n");
console.log(x.toString());

//little plus little
x = new FlexNum(1.1);
y = 1;

x.plus(y);
console.log("\nExpected output: 2.1");
console.log(x.toString());

//flex plus flex
x = new FlexNum(4);
y = new FlexNum(11111111111111111111n);

x.plus(y);
console.log("\nExpected output: 11111111111111111115n");
console.log(x.toString());


// ******
//Testing Subtraction
// ******

console.log("\n***********MINUS***********");

//Big minus Big
x = new FlexNum(11111111111111111111n);
y = 11111111111111111110n;

x.minus(y);
console.log("\nExpected output: 1");
console.log(x.toString());

//Big minus little
x = new FlexNum(11111111111111111111n);
y = 2.2;

x.minus(y);
console.log("\nExpected output: 11111111111111111109n");
console.log(x.toString());

//little minus big
x = new FlexNum(3.1);
y = 11111111111111111111n;

x.minus(y);
console.log("\nExpected output: -11111111111111111108n");
console.log(x.toString());

//little minus little
x = new FlexNum(1.1);
y = 1;

x.minus(y);
console.log("\nExpected output: 0.1");
console.log(x.toString());

//flex minus flex
x = new FlexNum(4);
y = new FlexNum(1);

x.minus(y);
console.log("\nExpected output: 3");
console.log(x.toString());

//***Testing Multiplication***
console.log("\n***********Mult***********");

//Big mult Big
x = new FlexNum(10000000000000000001n);
y = 10000000000000000000n;

x.mult(y);
console.log("\nExpected output: 100000000000000000010000000000000000000n");
console.log(x.toString());

//Big mult little
x = new FlexNum(10000000000000000010n);
y = -0.1;

x.mult(y);
console.log("\nExpected output: 1000000000000000001n");
console.log(x.toString());

//little mult big
x = new FlexNum(1.1);
y = 10000000000000000000n;

x.mult(y);
console.log("\nExpected output: 11000000000000000000n");
console.log(x.toString());

//little mult little
x = new FlexNum(1.1);
y = 1;

x.mult(y);
console.log("\nExpected output: 1.1");
console.log(x.toString());

//flex mult flex
x = new FlexNum(4);
y = new FlexNum(11111111111111111111n);

x.mult(y);
console.log("\nExpected output: 44444444444444444444n");
console.log(x.toString());


//***Testing Division***
console.log("\n***********Divide***********");

//Big divide Big
x = new FlexNum(10000000000000000001n);
y = 1000000000000000000n;

x.divide(y);
console.log("\nExpected output: 10");
console.log(x.toString());

//Big divide little
x = new FlexNum(10000000000000000010n);
y = 10;

x.divide(y);
console.log("\nExpected output: 1000000000000000001n");
console.log(x.toString());

//little divide big
x = new FlexNum(1.1);
y = 1000000000n;

x.divide(y);
console.log("\nExpected output: 1.1e-9");
console.log(x.toString());

//little divide little
x = new FlexNum(10);
y = 2;

x.divide(y);
console.log("\nExpected output: 5");
console.log(x.toString());


//***Testing compares***
console.log("\n***********Compares***********");

x = new FlexNum(1);
y = 2;

console.log("\nExpected output: true");
console.log(x.lt(y));

x = new FlexNum(11);
y = new FlexNum(5);

console.log("\nExpected output: false");
console.log(x.lt(y));

x = new FlexNum(5);
y = new FlexNum(5);

console.log("\nExpected output: true");
console.log(x.equal(y));

console.log(x > y);

