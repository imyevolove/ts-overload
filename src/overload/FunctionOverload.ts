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
        const encodedKey = Buffer.from(`${target.name}-overload-${propertyName}`, 'binary').toString('base64');
        const metadataKey = `_${encodedKey}`;
        
        if(!target.prototype.hasOwnProperty(metadataKey))
        {
            const builder = new FunctionOverloadProviderBuilder();
            buildAction(builder);
            target.prototype[metadataKey] = builder.build();
        }
        
        return target.prototype[metadataKey];
    };
}