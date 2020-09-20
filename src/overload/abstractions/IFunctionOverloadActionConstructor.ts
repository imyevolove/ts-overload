import IFunctionOverloadProviderBuilder from "./IFunctionOverloadProviderBuilder";

export interface Func<T>
{
    (...args: any[]): T;
}

export default interface IFunctionOverloadActionConstructor<T>
{
    action(action: Func<T>) : IFunctionOverloadProviderBuilder;
}