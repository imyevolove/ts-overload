import FunctionOverloadDescriptor from "../FunctionOverloadDescriptor";

export default interface IFunctionOverloadDescriptorBuilder
{
    addArgument(argument: Function): IFunctionOverloadDescriptorBuilder;
    addArgumentRange(args: Function[]): IFunctionOverloadDescriptorBuilder;
    setAction(action: Function): IFunctionOverloadDescriptorBuilder;
    build(): FunctionOverloadDescriptor;
}