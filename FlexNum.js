class FlexNum {
    //Pass num as a Number, BigInt, or String of numbers. 
    //Constructor will decide what type to give the variable.
    constructor(num, precisionDecimals = 0){
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
            this.number += this.convert_to_bigint(num);
        }
        else if(this.is_number() && typeof num === 'number'){
            if(this.above_max_safe(this.number + num)){
                this.number = this.convert_to_bigint(this.number) + this.convert_to_bigint(num);
            }
            else{
                this.number += num;
            }
            
        }
        else if(this.is_number() && typeof num ==='bigint'){
            if(this.above_max_safe(this.convert_to_bigint(this.number) + num)){
                this.number = this.convert_to_bigint(this.number) + num;
            }
            else{
                this.number = this.number + Number(num);
            }
        }
        
    }

    
    minus(num){
        
    }
    
    times(num){
        
    }
    
    div(num){

    }
    
    convert_to_bigint(num){
        return BigInt(parseInt(num));
    }

    //checks if passed number is above max safe 
    //return true if above safe
    above_max_safe(num){
        return (num > Number.MAX_SAFE_INTEGER / Math.pow(10,this.precision));
    }

    //checks to make sure the type is a number or BigInt
    check_NaN(){
        if(isNaN(this.number)){
            console.trace();
            throw `ERROR: "${num}" must be a Number or BigInt.`;
        }
    }

    
    is_number(){
        return typeof this.number === 'number';
    }
    
    is_bigint(){
        return typeof this.number === 'bigint';
    }
    
    
    toString(){
        return this.number;
    }
}

module.exports = FlexNum;