import FunctionOverload from "../src/overload/FunctionOverload";
import * as test from 'tape'

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

test('0 args', tape => { tape.equal(overloading.sum(), 0); tape.end(); })
test('1 args', tape => { tape.equal(overloading.sum(10), 10); tape.end(); })
test('2 args', tape => { tape.equal(overloading.sum(10, 5), 15); tape.end(); })
test('str arg', tape => { tape.equal(overloading.sum('13'), 13); tape.end(); })