export default interface IFunctionOverloadProvider
{
    invoke(context: Object, args: IArguments): any;
}