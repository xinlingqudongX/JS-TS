"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflex = void 0;
/**
 * 映射装饰器 将属性名映射为其他名称
 * @param name 名称
 */
function Reflex(name) {
    return function (target, propertyKey, descriptor) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[name];
            },
            set: function (val) {
                this[name] = val;
            },
            enumerable: false,
            configurable: false
        });
    };
}
exports.Reflex = Reflex;
//# sourceMappingURL=decorator.js.map