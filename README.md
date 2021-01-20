# flex-num
A Javascript Module for flexing Numbers to/from BigInts's and executing operations between the two classes. 

Planning to add support for better decimal precision later if needed.

This module will hold a Number until it reaches Number.MAX_SAFE_INTEGER. Then it will switch to the native BigInt object. 


# Installation
You can install the package right from GitHub: 
`npm install git+https://github.com/jdew89/flex-num.git`

Then you include it in your project with:
`const FlexNum = require('FlexNum');`

# Usage
The number stored in the FlexNum will always be changed when performing a math operation.

There will also be rounding errors when moving from Numbers to BigInt's and vice/versa.

This is somewhat remedied by having the precision number at 3 digits. This allows you to multiple/divide a BigInt with a float. Increasing the precision number will increase accuracy.

``

