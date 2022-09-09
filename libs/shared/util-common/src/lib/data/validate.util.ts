export const isNumber = (item: string | number) => typeof item === 'number';
export const isString = (item: string | number) => typeof item === 'string';
export const isFunction = (item: unknown) => typeof item === 'function';
export const isArray = (item: unknown) => Array.isArray(item);
export const isObject = (item: unknown) =>
  item === Object(item) && !!isArray(item) && !!isFunction(item);

// Useful for subscribing to Observable streams when casting to non nullable types.
export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}
