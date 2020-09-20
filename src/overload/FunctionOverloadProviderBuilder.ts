import FunctionOverloadProvider from "./FunctionOverloadProvider";
import IFunctionOverloadProvider from "./abstractions/IFunctionOverloadProvider";
import IFunctionOverloadProviderBuilder from "./abstractions/IFunctionOverloadProviderBuilder";
import FunctionOverloadDescriptor from "./FunctionOverloadDescriptor";
import IFunctionOverloadActionConstructor from "./abstractions/IFunctionOverloadActionConstructor";
import IFunctionOverloadArgumentsConstructor from "./abstractions/IFunctionOverloadArgumentsConstructor";
import ValidationUtilities from "./utilities/ValidationUtilities";
import FunctionOverloadArgumentsConstructor from "./FunctionOverloadArgumentsConstructor";
import FunctionOverloadDescriptorBuilder from "./FunctionOverloadDescriptorBuilder";
import FunctionOverloadActionConstructor from "./FunctionOverloadActionConstructor";

const validationMessages = {
    descriptorNotDefined: "Descriptor is not defined"
};

export default class FunctionOverloadProviderBuilder implements IFunctionOverloadProviderBuilder
{
    private _descriptors: FunctionOverloadDescriptor[] = [];

    public addDescriptor(descriptor: FunctionOverloadDescriptor): IFunctionOverloadProviderBuilder 
    {
        ValidationUtilities.validateNullOrUndefined(descriptor, validationMessages.descriptorNotDefined);
        this._descriptors.push(descriptor);
        return this.getThis();
    }

    public map<T>(...args: Function[]): IFunctionOverloadActionConstructor<T>
    {
        return new FunctionOverloadArgumentsConstructor(this.getThis(), new FunctionOverloadDescriptorBuilder()).args(...args);
    }

    public build() : IFunctionOverloadProvider
    {
        return new FunctionOverloadProvider(this._descriptors);
    }

    private getThis() : IFunctionOverloadProviderBuilder
    {
        return this as any as IFunctionOverloadProviderBuilder;
    }
}