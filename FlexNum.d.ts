declare module FlexNum {
    plus(num: any): void;

    minus(num: any): void;

    mult(num: any): void;

    divide(num: any): void;

    convert_to_bigint(num: number): bigint;

    above_max_safe(num: number): boolean;

    below_min_safe(num: number): boolean;

    check_NaN(): void;

    //greater than
    gt(num: any): boolean;

    //less than
    lt(num: any): boolean;

    equal(num: any): boolean;

    is_number(): boolean;

    is_bigint(): boolean;

    toString(): string;
}