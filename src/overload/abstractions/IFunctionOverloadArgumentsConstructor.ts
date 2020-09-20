import IFunctionOverloadActionConstructor from "./IFunctionOverloadActionConstructor";
export default interface IFunctionOverloadArgumentsConstructor<T>
{
    args(...args: Array<Function>) : IFunctionOverloadActionConstructor<T>;
}