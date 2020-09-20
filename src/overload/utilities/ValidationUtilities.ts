export default class ValidationUtilities
{
    public static validateNullOrUndefined<T>(value: T, message: string)
    {
        if(value !== null && value !== undefined) return;
        throw new ReferenceError(message);
    }
}