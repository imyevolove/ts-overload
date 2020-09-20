import IFunctionOverloadProvider from "./abstractions/IFunctionOverloadProvider";
import FunctionOverloadDescriptor from "./FunctionOverloadDescriptor";

export default class FunctionOverloadProvider implements IFunctionOverloadProvider
{
    private _schemas: FunctionOverloadDescriptor[];

    public constructor(schemas: FunctionOverloadDescriptor[])
    {
        this._schemas = schemas;
    }

    public invoke(context: Object, args: IArguments): any
    {
        const arr = Array.from(args);
        const schema = this._schemas.find(schema => {
            return arr.length != schema.Arguments.length 
                ? false 
                : arr.every((value, index) => { return schema.Arguments[index] == (value as Object)?.constructor ?? Object; });
        });
        return schema?.Action.apply(context, args);
    }
}