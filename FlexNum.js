
const POSTFIX_AA = ["", "k", "m", "b", "t", "aa", "ab", "ac", "ad", "ae", "af", "ag", 
    "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", 
    "au", "av", "aw", "ax", "ay", "az", "ba", "bb", "bc", "bd", "be", "bf", "bg", 
    "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", 
    "bu", "bv", "bw", "bx", "by", "bz", "ca", "cb", "cc", "cd", "ce", "cf", "cg", 
    "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", 
    "cu", "cv", "cw", "cx", "cy", "cz"];

/*let i = 0;
let s = ""
while (i < 26) {
    s = `${s},"c${String.fromCharCode(i + 97)}"`;
    i++;
}

console.log(s);*/

class FlexNum {
    //Pass val as a number, BigInt, or String of numbers. 
    //Constructor will decide what type to give the variable.
    constructor(number, precision = 3){
        if(number instanceof Object){
            if(number.precision){
                precision = number.precision;
            }
            number = number.number;
        }
        this.precision = precision; //tracks decimal point location
        if(this.above_max_safe(number)){
            this.number = BigInt(number);
        }
        else{
            this.number = Number(number);
            this.check_NaN();
        }
    }

    //Add the passed number to this number.
    plus(val){
        //if number is a FlexNum, convert it to just the raw number
        if(val instanceof FlexNum){
            val = val.number;
        }

        if(this.is_bigint()){
            if(typeof val === 'bigint'){
                this.number += val;
            }
            else{
                this.number += this.convert_to_bigint(val);
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof val === 'number'){
                if(this.above_max_safe(this.number + val) || this.below_min_safe(this.number + val)){
                    this.number = this.convert_to_bigint(this.number) + this.convert_to_bigint(val);
                }
                else{
                    this.number += val;
                }
                
            }
            else {
                if(this.above_max_safe(this.convert_to_bigint(this.number) + val) || this.below_min_safe(this.convert_to_bigint(this.number) + val)){
                    this.number = this.convert_to_bigint(this.number) + val;
                }
                else{
                    this.number = this.number + Number(val);
                }
            }
        }
    }

    
    minus(val){
        //if number is a FlexNum, convert it to just the raw number
        if(val instanceof FlexNum){
            val = val.number;
        }

        if(this.is_bigint()){
            if(typeof val === 'bigint'){
                this.number -= val;
            }
            else{
                this.number -= this.convert_to_bigint(val);
            }

            //if between +/- safe ints, convert to number
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof val === 'number'){
                if(this.above_max_safe(this.number - val) || this.below_min_safe(this.number - val)){
                    this.number = this.convert_to_bigint(this.number) - this.convert_to_bigint(val);
                }
                else{
                    this.number -= val;
                }
                
            }
            else{
                if(this.above_max_safe(this.convert_to_bigint(this.number) - val) || this.below_min_safe(this.convert_to_bigint(this.number) - val)){
                    this.number = this.convert_to_bigint(this.number) - val;
                }
                else{
                    this.number = this.number - Number(val);
                }
            }
        }
    }
    
    mult(val){
        //if number is a FlexNum, convert it to just the raw number
        if(val instanceof FlexNum){
            val = val.number;
        }

        if(this.is_bigint()){
            if(typeof val === 'bigint'){
                this.number *= val;
            }
            else{
                
                this.number *= this.convert_to_bigint(val * Math.pow(10, this.precision));
                this.number /= BigInt(Math.pow(10,this.precision));
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof val === 'number'){
               if(this.above_max_safe(this.number * val) || this.below_min_safe(this.number * val)){
                   this.number = this.convert_to_bigint(this.number) * this.convert_to_bigint(val);
               }
               else{
                   this.number *= val;
               }
           }
           else{
               //TODO if this is close to max, moving the pointer before 
               //converting to BigInt will cause precision errors
               this.number *= Math.pow(10, this.precision);
               
               if(this.above_max_safe(this.convert_to_bigint(this.number) * val)){
                   this.number = this.convert_to_bigint(this.number) * val;
                   this.number /= BigInt(Math.pow(10,this.precision));
               }
               else{
                   this.number = this.number * Number(val);
                   this.number /= Math.pow(this.precision);
               }

           }
        }
    }
    
    divide(val){
        //if number is a FlexNum, convert it to just the raw number
        if(val instanceof FlexNum){
            val = val.number;
        }

        if(val == 0){
            throw new Error(`Cannot divide by zero.`);
        }

        if(this.is_bigint()){
            if(typeof val === 'bigint'){
                this.number /= val;
            }
            else{
                this.number *= BigInt(Math.pow(10,this.precision)); //move decimal for precision
                this.number /= this.convert_to_bigint(val * Math.pow(10, this.precision)); //return decimal for precision
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof val === 'number'){
               if(this.above_max_safe(this.number / val) || this.below_min_safe(this.number / val)){
                   this.number = this.number / val;
               }
               else{
                   this.number /= val;
               }
           }
           else{
               //TODO if this is close to max, moving the pointer before 
               //converting to BigInt will cause precision errors
               this.number *= Math.pow(10, this.precision);
               
               if(this.above_max_safe(this.convert_to_bigint(this.number) / val)){
                   this.number = this.convert_to_bigint(this.number) / val;
                   this.number /= BigInt(Math.pow(10,this.precision));
               }
               else{
                   this.number = this.number / Number(val);
                   this.number /= Math.pow(10,this.precision);
               }
           }
        }
    }

    //raises this number to power of x
    pow(val) {
        if (val instanceof FlexNum) {
            val = val.number;
        }
        if (val < 0) {
            throw new Error(`"${val}" must be positive.`);
        }
        //if x is a decimal, throw error
        if (typeof val === 'number' && val % 1 != 0) {
            throw new Error(`"${val}" must be an Integer.`);
        }
        if (this.is_number()) {
            if (typeof val === 'number') {
                let temp = Math.pow(this.number, val);
                if (this.above_max_safe(temp) || this.below_min_safe(temp)) {
                    this.number = this.convert_to_bigint(this.number);
                    val = this.convert_to_bigint(val);
                    this.number **= val;
                }
                else {
                    this.number = temp;
                }
            }
            else {
                this.number = this.convert_to_bigint(this.number);
                this.number **= val;
            }
        }
        else { //if this is a BigInt
            if (typeof val === 'number') {
                val = this.convert_to_bigint(val);
                this.number **= val;
            }
            else {
                this.number **= val;
            }
        }
    }

    mod(val) {
        //if number is a FlexNum, convert it to just the raw number
        if (val instanceof FlexNum) {
            val = val.number;
        }
        if (val == 0) {
            throw new Error(`Cannot divide by zero.`);
        }
        //if x is a decimal, throw error
        if (typeof x === 'number' && x % 1 != 0) {
            throw new Error(`"${x}" must be an Integer.`);
        }

        //if this number is smaller than val, the mod is just this number.
        if (this.number >= val) {
            if (this.is_bigint()) {
                if (typeof val === 'bigint') {
                    this.number %= val;
                }
                else {
                    this.number %= this.convert_to_bigint(val);
                }
    
                if (!this.above_max_safe(this.number) && !this.below_min_safe(this.number)) {
                    this.number = Number(this.number);
                }
            }
            else {
                if (typeof val === 'number') {
                    this.number %= val;
                }
                else{
                    //if this num is bigger than val, and val is a bigint, convert val to number
                    this.number %= Number(val);
                }
            }
        }
    }

    floor() {
        if (this.is_number()) {
            this.number = Math.floor(this.number);
        }
    }

    ceil() {
        if (this.is_number()) {
            this.number = Math.ceil(this.number);
        }
    }

    round() {
        if (this.is_number()) {
            this.number = Math.round(this.number);
        }
    }

    abs() {
        if (this.is_number()) {
            this.number = Math.abs(this.number);
        }
        else {
            if (this.number < 0) {
                this.number = this.number * -1n;
            }
        }
    }

    //greater than
    gt(val){
        if (val instanceof FlexNum) {
            val = val.number;
        }
        return this.number > val;
    }

    //greater than or equal
    gte(val) {
        if (val instanceof FlexNum) {
            val = val.number;
        }
        return this.number >= val;
    }

    //less than
    lt(val){
        if (val instanceof FlexNum) {
            val = val.number;
        }
        return this.number < val;
    }

    //less than or equal
    lte(val) {
        if (val instanceof FlexNum) {
            val = val.number;
        }
        return this.number <= val;
    }

    equal(val){
        if (val instanceof FlexNum) {
            val = val.number;
        }
        return this.number == val;
    }


    convert_to_bigint(val) {
        return BigInt(parseInt(val));
    }

    convert_to_number(val) {
        return Number(val);
    }

    //checks if passed number is above max safe 
    //return true if above safe
    above_max_safe(val) {
        return (val > Number.MAX_SAFE_INTEGER / Math.pow(10, this.precision));
    }

    below_min_safe(val) {
        return (val < Number.MIN_SAFE_INTEGER / Math.pow(10, this.precision));
    }

    //checks to make sure the type is a number or BigInt
    check_NaN() {
        if (isNaN(this.number)) {
            throw new Error(`ERROR: "${val}" must be a number or BigInt.`);
        }
    }

    is_number(){
        return typeof this.number === 'number';
    }
    
    is_bigint(){
        return typeof this.number === 'bigint';
    }

    is_float(){
        if (typeof this.number === 'number' && this.number % 1 != 0) {
            return true;
        }
        return false;
    }

    //formats a number using fixed point notation.
    //pass in the value
    //only works on Number, not BigInt
    //default is zero digits
    to_fixed(digits = 0){
        if(this.is_number()){
            return this.number.toFixed(digits)
        }
        return this.number;
    }

    

    
    toString(){
        return this.number.toString();
    }

    //TODO edit this to return only 6 digits with Big name
    to_big_string(){
        if(this.is_number()){
            return this.number.toFixed(3);
        }
        else{
            if(this.number.toString())
            return this.number;
        }
    }

    to_aa_string(){
        let insertseperator = function(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(".");
        }

        //if less than 1000, then return a normal str with decimals
        if(this.number < 1000){
            return this.number.toFixed(this.precision);
        }

        //if number is >= 1000 then ignore the decimals
        let numstr = (this.is_number()) ? this.number.toFixed(0): this.number.toString();
        let numlen = numstr.length;
        switch (numlen % 3){
            case 0:
                numstr = numstr.slice(0,6);
                break;
            case 1:
                numstr = numstr.slice(0,4);
                break;
            case 2: 
                numstr = numstr.slice(0,5);
                break;
            default:
                numstr = numstr.slice(0, 6);


        }
        
        return insertseperator(numstr) + POSTFIX_AA[Math.floor((numlen-1) / 3)]; 
    }

    //only returned integer string with no decimals.
    to_integer_string(){
        if (this.is_number()) {
            return this.number.toFixed(0);
        }
        else {
            if (this.number.toString())
                return this.number;
        }
    }
}

module.exports = FlexNum;