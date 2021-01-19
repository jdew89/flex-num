class FlexNum {
    //Pass num as a Number, BigInt, or String of numbers. 
    //Constructor will decide what type to give the variable.
    constructor(num, precisionDecimals = 3){
        this.precision = precisionDecimals; //tracks decimal point location
        if(this.above_max_safe(num)){
            this.number = BigInt(num);
        }
        else{
            this.number = Number(num);
            this.check_NaN()
        }
    }

    //Add the passed number to this number.
    plus(num){
        //if number is a FlexNum, convert it to just the raw number
        if(num instanceof FlexNum){
            num = num.number;
        }

        if(this.is_bigint()){
            if(typeof num === 'bigint'){
                this.number += num;
            }
            else{
                this.number += this.convert_to_bigint(num);
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof num === 'number'){
                if(this.above_max_safe(this.number + num) || this.below_min_safe(this.number + num)){
                    this.number = this.convert_to_bigint(this.number) + this.convert_to_bigint(num);
                }
                else{
                    this.number += num;
                }
                
            }
            else {
                if(this.above_max_safe(this.convert_to_bigint(this.number) + num) || this.below_min_safe(this.convert_to_bigint(this.number) + num)){
                    this.number = this.convert_to_bigint(this.number) + num;
                }
                else{
                    this.number = this.number + Number(num);
                }
            }
        }
    }

    
    minus(num){
        //if number is a FlexNum, convert it to just the raw number
        if(num instanceof FlexNum){
            num = num.number;
        }

        if(this.is_bigint()){
            if(typeof num === 'bigint'){
                this.number -= num;
            }
            else{
                this.number -= this.convert_to_bigint(num);
            }

            //if between +/- safe ints, convert to Number
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof num === 'number'){
                if(this.above_max_safe(this.number - num) || this.below_min_safe(this.number - num)){
                    this.number = this.convert_to_bigint(this.number) - this.convert_to_bigint(num);
                }
                else{
                    this.number -= num;
                }
                
            }
            else{
                if(this.above_max_safe(this.convert_to_bigint(this.number) - num) || this.below_min_safe(this.convert_to_bigint(this.number) - num)){
                    this.number = this.convert_to_bigint(this.number) - num;
                }
                else{
                    this.number = this.number - Number(num);
                }
            }
        }
    }
    
    mult(num){
        //if number is a FlexNum, convert it to just the raw number
        if(num instanceof FlexNum){
            num = num.number;
        }

        if(this.is_bigint()){
            if(typeof num === 'bigint'){
                this.number *= num;
            }
            else{
                
                this.number *= this.convert_to_bigint(num * Math.pow(10, this.precision));
                this.number /= BigInt(Math.pow(10,this.precision));
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof num === 'number'){
               if(this.above_max_safe(this.number * num) || this.below_min_safe(this.number * num)){
                   this.number = this.convert_to_bigint(this.number) * this.convert_to_bigint(num);
               }
               else{
                   this.number *= num;
               }
           }
           else{
               //TODO if this is close to max, moving the pointer before 
               //converting to BigInt will cause precision errors
               this.number *= Math.pow(10, this.precision);
               
               if(this.above_max_safe(this.convert_to_bigint(this.number) * num)){
                   this.number = this.convert_to_bigint(this.number) * num;
                   this.number /= BigInt(Math.pow(10,this.precision));
               }
               else{
                   this.number = this.number * Number(num);
                   this.number /= Math.pow(this.precision);
               }

           }
        }
    }
    
    divide(num){
        //if number is a FlexNum, convert it to just the raw number
        if(num instanceof FlexNum){
            num = num.number;
        }

        if(num == 0){
            throw new Error(`Cannot divide by zero.`);
        }

        if(this.is_bigint()){
            if(typeof num === 'bigint'){
                this.number /= num;
            }
            else{
                this.number *= BigInt(Math.pow(10,this.precision)); //move decimal for precision
                this.number /= this.convert_to_bigint(num * Math.pow(10, this.precision)); //return decimal for precision
            }
            
            if(!this.above_max_safe(this.number) && !this.below_min_safe(this.number)){
                this.number = Number(this.number);
            }
        }
        else{
            if(typeof num === 'number'){
               if(this.above_max_safe(this.number / num) || this.below_min_safe(this.number / num)){
                   this.number = this.number / num;
               }
               else{
                   this.number /= num;
               }
           }
           else{
               //TODO if this is close to max, moving the pointer before 
               //converting to BigInt will cause precision errors
               this.number *= Math.pow(10, this.precision);
               
               if(this.above_max_safe(this.convert_to_bigint(this.number) / num)){
                   this.number = this.convert_to_bigint(this.number) / num;
                   this.number /= BigInt(Math.pow(10,this.precision));
               }
               else{
                   this.number = this.number / Number(num);
                   this.number /= Math.pow(10,this.precision);
               }
           }
        }
    }
    
    convert_to_bigint(num){
        return BigInt(parseInt(num));
    }

    //checks if passed number is above max safe 
    //return true if above safe
    above_max_safe(num){
        return (num > Number.MAX_SAFE_INTEGER / Math.pow(10,this.precision));
    }

    below_min_safe(num){
        return (num < Number.MIN_SAFE_INTEGER / Math.pow(10,this.precision));
    }

    //checks to make sure the type is a number or BigInt
    check_NaN(){
        if(isNaN(this.number)){
            throw new Error(`ERROR: "${num}" must be a Number or BigInt.`);
        }
    }


    //>>>>>>>> regular compares actually work so I might not need these.

    //greater than
    gt(num){
        if (num instanceof FlexNum) {
            num = num.number;
        }
        return this.number > num;
    }

    //greater than or equal
    gte(num) {
        if (num instanceof FlexNum) {
            num = num.number;
        }
        return this.number >= num;
    }

    //less than
    lt(num){
        if (num instanceof FlexNum) {
            num = num.number;
        }
        return this.number < num;
    }

    //less than or equal
    lte(num) {
        if (num instanceof FlexNum) {
            num = num.number;
        }
        return this.number <= num;
    }

    equal(num){
        if (num instanceof FlexNum) {
            num = num.number;
        }
        return this.number == num;
    }
    
    is_number(){
        return typeof this.number === 'number';
    }
    
    is_bigint(){
        return typeof this.number === 'bigint';
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