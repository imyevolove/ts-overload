import IFunctionOverloadActionConstructor from "./abstractions/IFunctionOverloadActionConstructor";
import IFunctionOverloadArgumentsConstructor from "./abstractions/IFunctionOverloadArgumentsConstructor";
import IFunctionOverloadDescriptorBuilder from "./abstractions/IFunctionOverloadDescriptorBuilder";
import IFunctionOverloadProviderBuilder from "./abstractions/IFunctionOverloadProviderBuilder";
import FunctionOverloadActionConstructor from "./FunctionOverloadActionConstructor";
import ValidationUtilities from "./utilities/ValidationUtilities";

const validationMessages = {
    descriptorNotDefined: "Descriptor argument is not defined",
    providerNotDefined: "Overload provider argument is not defined"
};

export default class FunctionOverloadArgumentsConstructor<T> implements IFunctionOverloadArgumentsConstructor<T>
{
    private _descriptorBuilder: IFunctionOverloadDescriptorBuilder;
    private _overloadProviderBuilder: IFunctionOverloadProviderBuilder;

    public constructor(overloadProviderBuilder: IFunctionOverloadProviderBuilder, descriptorBuilder: IFunctionOverloadDescriptorBuilder)
    {
        ValidationUtilities.validateNullOrUndefined(overloadProviderBuilder, validationMessages.providerNotDefined);
        ValidationUtilities.validateNullOrUndefined(descriptorBuilder, validationMessages.descriptorNotDefined);
        
        this._overloadProviderBuilder = overloadProviderBuilder;
        this._descriptorBuilder = descriptorBuilder;
    }

    args(...args: Function[]): IFunctionOverloadActionConstructor<T>
    {
        return new FunctionOverloadActionConstructor(
            this._overloadProviderBuilder, 
            this._descriptorBuilder.addArgumentRange(args))
    }
    
}