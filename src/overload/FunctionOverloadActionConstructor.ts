import IFunctionOverloadActionConstructor from "./abstractions/IFunctionOverloadActionConstructor";
import IFunctionOverloadDescriptorBuilder from "./abstractions/IFunctionOverloadDescriptorBuilder";
import IFunctionOverloadProviderBuilder from "./abstractions/IFunctionOverloadProviderBuilder";
import ValidationUtilities from "./utilities/ValidationUtilities";

const validationMessages = {
    descriptorNotDefined: "Descriptor argument is not defined",
    providerNotDefined: "Overload provider argument is not defined"
};

export default class FunctionOverloadActionConstructor<T> implements IFunctionOverloadActionConstructor<T>
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
    
    action(action: Function): IFunctionOverloadProviderBuilder 
    {
        return this._overloadProviderBuilder.addDescriptor(this._descriptorBuilder.setAction(action).build());
    }
    
}