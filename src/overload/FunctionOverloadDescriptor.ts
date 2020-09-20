export default class FunctionOverloadDescriptor
{
    public readonly Arguments: Function[] = [];
    public readonly Action: Function;

    public constructor(args: Function[], action: Function)
    {
        this.Arguments = args;
        this.Action = action;
    }
}