import { FunctionOverload } from "../src/index";

class Overloading
{
    public value: string = "test";
    public sum(value: string) : number;
    public sum(value: number) : number;
    public sum(value: number, value2: number) : number;
    public sum() : number;
    public sum() : number 
    { 
        return FunctionOverload.overload<Overloading>(this, 'sum', builder => 
        {
            builder
                .map<Number>(String)
                .action(this.printImplemetationStringArgument)
                
                .map<Number>(Number)
                .action(this.printImplemetationNumberArgument)
                
                .map<Number>(Number, Number)
                .action(this.printImplemetationNumberStringArgument)
                
                .map<Number>()
                .action(this.printImplemetationNoArguments)
        }).invoke(this, arguments);
    }

    private printImplemetationStringArgument(value: string) : number
    {
        return parseInt(value);
    }

    private printImplemetationNumberArgument(value: number) : number
    {
        return value;
    }

    private printImplemetationNumberStringArgument(value: number, value2: number) : number
    {
        return value + value2;
    }

    private printImplemetationNoArguments() : number
    {
        return 0;
    }
}

const overloading = new Overloading();

console.log(overloading.sum());
console.log(overloading.sum(10));
console.log(overloading.sum(10));
console.log(overloading.sum('13'));