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
y = new FlexNum(4);

console.log("\nExpected output: false");
console.log(x.lte(y));



// OTHER
console.log("\n***********To Strings***********");
x = new FlexNum(5.999999);
y = new FlexNum(123456789023456789n);

console.log(x.toString());
console.log(x.to_big_string());
console.log(y.toString());
console.log(y.to_big_string());


//Testing constructor behavior with passing a FlexNum
console.log("\n***********Passing FlexNums to Constructor***********");
x = new FlexNum(10);
y = new FlexNum(20);

x = new FlexNum(y);
x = new FlexNum({number: 33, precision: 5});
console.log("==============");
console.log(x);
console.log(y);
x.plus(11);
console.log(x);
console.log(y);


//Testing Math funcs
console.log("\n***********Math rounding funcs***********");

x = new FlexNum(-1.1);
y = new FlexNum(2.5);

x.round();
y.round();
console.log(x);
console.log(y);

x.abs();
console.log(x);

console.log("\n***********power func***********");
x = new FlexNum(10);
y = 20;

x.pow(y);
console.log(x);
y = 2.5;
x.plus(y);
console.log(x);

console.log("\n***********mod func***********");
x = new FlexNum(10000000000000000000n);
y = 3.2;

x.mod(y);
console.log(x);
x = new FlexNum(10);
y = 2.2;
x.mod(y);
console.log(x);


console.log("\n***********To Fixed Func***********");

x = new FlexNum(3n);
console.log(x.to_fixed(3));

console.log("\n***********To aa string***********");

x = new FlexNum(128643123111564387325634826834265834265834658342658345634681123174827658456865834568324638465823645837426587346834769521n);
console.log(x.to_aa_string());


