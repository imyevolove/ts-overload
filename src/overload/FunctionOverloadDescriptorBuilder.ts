import IFunctionOverloadDescriptorBuilder from "./abstractions/IFunctionOverloadDescriptorBuilder";
import FunctionOverloadDescriptor from "./FunctionOverloadDescriptor";
import ValidationUtilities from "./utilities/ValidationUtilities";

const validationMessages = {
    actionNotDefined: "Action is not defined",
    argumentNotDefined: "Argument is not defined",
    buildActionNotDefied: "Action is not defined. Please use setAction to define an action"
};

export default class FunctionOverloadDescriptorBuilder implements IFunctionOverloadDescriptorBuilder
{
    private _arguments: Function[] = [];
    private _action: Function | null = null;

    public addArgument(argument: Function): IFunctionOverloadDescriptorBuilder 
    {
        ValidationUtilities.validateNullOrUndefined(argument, validationMessages.argumentNotDefined);
        this._arguments.push(argument);
        return this;
    }

    public addArgumentRange(args: Function[]): IFunctionOverloadDescriptorBuilder {
        args.forEach(arg => this.addArgument(arg));
        return this;
    }

    public setAction(action: Function): IFunctionOverloadDescriptorBuilder 
    {
        ValidationUtilities.validateNullOrUndefined(action, validationMessages.actionNotDefined);
        this._action = action;
        return this;
    }

    public build(): FunctionOverloadDescriptor 
    {
        ValidationUtilities.validateNullOrUndefined(this._action, validationMessages.buildActionNotDefied);
        return new FunctionOverloadDescriptor(this._arguments, this._action as Function);
    }
}