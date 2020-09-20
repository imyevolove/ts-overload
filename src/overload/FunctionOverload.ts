import 'reflect-metadata';
import IFunctionOverloadProvider from './abstractions/IFunctionOverloadProvider';
import IFunctionOverloadProviderBuilder from './abstractions/IFunctionOverloadProviderBuilder';
import FunctionOverloadProviderBuilder from './FunctionOverloadProviderBuilder';

interface FunctionOverloadBuildDelegate {
    (builder: IFunctionOverloadProviderBuilder): void
}

export default class FunctionOverload
{
    public static overload<T>(context: T, propertyName: keyof T, buildAction: FunctionOverloadBuildDelegate) 
{
    const target = (context as Object).constructor;
    const metadataKey = `override-${propertyName}`;
    const propertyKey = propertyName.valueOf() as string;

    if(!Reflect.hasMetadata(metadataKey, target, propertyKey))
    {
        const builder = new FunctionOverloadProviderBuilder();
        buildAction(builder);
        Reflect.defineMetadata(metadataKey, builder.build(), target, propertyKey);
    }
    
    return Reflect.getMetadata(metadataKey, target, propertyKey) as IFunctionOverloadProvider;
};
}