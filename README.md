# flex-num
A Javascript Module for flexing Numbers to/from BigInts's and executing operations between the two classes. This module will hold a Number until it reaches Number.MAX_SAFE_INTEGER. Then it will switch to the native BigInt object. Operations between BitInts and Numbers is normally prohibited, but flex-num will handle the conversion between the two classes and calculate the operations. 


# Installation
You can install the package right from GitHub:
```
npm install git+https://github.com/jdew89/flex-num.git
```
Then include it in your project with:

```
const FlexNum = require('flex-num');
```

# Usage
To create a new FlexNum, do the following:

```
var x = new FlexNum(10);
```

You can create a new FlexNum from any number type:

```
var num = new FlexNum(10); //Number
var float = new FlexNum(10.5); //Float
var bignum = new FlexNum(10000000n); //Native BigInt
var numstr = new FlexNum("123"); //Number as a string
var numobj = new FlexNum({number: 321}); //Number as an object
```
You can also create numbers with different precision. This is useful if you have large decimals that need to be used with BitInts. The default precision is `3`.

```
var num = new FlexNum(10, 5); // FlexNum with number 10, precision 5
var num = new FlexNum({number: 20, precision: 4}); //Can also create with an Object

```

To perform a math operation, call the appropriate method on the FlexNum object:

```
var x = FlexNum(10); //Create FlexNum with number 10

x.plus(20); //Result: 30
x.minus(5); //Result: 25
x.mult(4); //Result: 100
x.divide(50); //Result: 2
x.pow(4); //Result: 16
x.mod(5); //Result: 1
```

Any type of number can be used for a Math operation. For example, you can do `x.plus(new FlexNum(10));` or `x.plus(10000n);` or `x.plus(2.5);`. The types will adjust accordingly to perform the operation.

## Note:

The number stored in the FlexNum will always be changed when performing a math operation. Assigning `y` the value of `x` like so: `var y = x` will assign it by reference and cause both variables to change together. To get around this, you can make a copy of FlexNum by doing the following:

```
var x  = new FlexNum(1);
var y = new FlexNum(x);
```

## Flexing between Number and BigInt

There will be rounding errors when moving from Numbers to BigInt's and vice/versa. It will always round toward zero.

This is somewhat remedied by having the precision number at 3 digits. This allows you to multiple/divide a BigInt with a float. Increasing the precision number will increase accuracy.

Here is an example:
```
var x = new flexNum(10000000000000000000n);
x.mult(0.125); //Result: 1250000000000000000n
```

# List of Operations

```
/***
*Math Functions
***/

var x = new FlexNum(10);

//Addition
x.plus(20); //Result: 30

//Subtraction
x.minus(5); //Result: 25

//Multiplication
x.mult(4); //Result: 100

//Division
x.divide(50); //Result: 2

//Power
x.pow(4); //Result: 16

//Remainder Function
x.mod(5); //Result: 1

//Floor Function
x = new FlexNum(2.5);
x.floor() //Result: 2

//Ceil Function
x = new FlexNum(2.5);
x.ceil() //Result: 3

//Round Function
x = new FlexNum(2.5);
x.round() //Result: 3

//Absolute Value Function
x = new FlexNum(-2);
x.abs() //Result: 2


/***
*Comparison Functions
***/

//Greater than
x = new FlexNum(10)
x.gt(5) //Result: true

//Greater than or equal to
x = new FlexNum(10)
x.gt(10) //Result: true

//Less than
x = new FlexNum(10)
x.lt(5) //Result: false

//Less than or equal to
x = new FlexNum(10)
x.lte(10) //Result: true

//Equal
x = new FlexNum(10)
x.equal(10) //Result: true


//***
*Formatting and String Functions
*
* These do NOT change the value of the number stored in FlexNum
* They return an altered value of the number. See below for examples.
***/

x = new FlexNum(2.5);
x.to_fixed(3); //Result: 2.500
//If the number is a BigInt, it will just return the BigInt without any decimals.

//To Integer String
x = new FlexNum(2.5);
x.to_integer_string() //Result: 2

//To aa String
//This method returns a string of the number in aa notation.
//It inserts a letter starting with 1000 = k
// It goes as follows:
// "", "k", "m", "b", "t", "aa", "ab", etc...
x = new FlexNum(12345678901234567890n);
x.to_aa_string() //Result: 12.345ab
```

# Licence
FlexNum is licensed under the MIT license.

