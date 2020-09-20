import FunctionOverloadDescriptor from "../FunctionOverloadDescriptor";
import IFunctionOverloadActionConstructor from "./IFunctionOverloadActionConstructor";
import IFunctionOverloadProvider from "./IFunctionOverloadProvider";

export default interface IFunctionOverloadProviderBuilder
{
    addDescriptor(descriptor: FunctionOverloadDescriptor) : IFunctionOverloadProviderBuilder;
    map<T>(...args: Function[]) : IFunctionOverloadActionConstructor<T>;
    build() : IFunctionOverloadProvider;
}