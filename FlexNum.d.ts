declare module FlexNum {
    plus(val: any): void;

    minus(val: any): void;

    mult(val: any): void;

    divide(val: any): void;

    convert_to_bigint(val: number): bigint;

    above_max_safe(val: number): boolean;

    below_min_safe(val: number): boolean;

    check_NaN(): void;

    //greater than
    gt(val: any): boolean;

    //less than
    lt(val: any): boolean;

    equal(val: any): boolean;

    is_number(): boolean;

    is_bigint(): boolean;

    toString(): string;
}