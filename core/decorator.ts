/**
 * 映射装饰器 将属性名映射为其他名称
 * @param name 名称
 */
export function Reflex(name: string): Function {
    return function (
        target: unknown,
        propertyKey: string,
        descriptor?: PropertyDescriptor
    ) {
         Object.defineProperty(target, propertyKey, {
             get() {
                 return this[name];
             },
             set(val) {
                 this[name] = val;
             },
             enumerable: false,
             configurable: false
         });
    }
}
