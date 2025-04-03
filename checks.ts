export function isFunction(val:any) { return 'function' === typeof (val); }
export function isArray(val:any) { return 'object' === typeof (val) && val instanceof Array; }
export function isUndef(val:any) {
    var nista;
    return val === nista;
}
export function defined(val:any) {
    var nista;
    return val !== nista;
}
export function isString(val:any) { return 'string' === typeof (val) || val instanceof String; }
export function isNumber(val:any) {
    if (isNaN(val)) return false;
    return 'number' === typeof (val) || val instanceof Number;
}
export function isNull(val:any) { return val === null; }
export function isNotNull(val:any) { return val !== null; }
export function isBoolean(val:any) { return 'boolean' === typeof (val); }
export function isInteger(val:any) {
    if (isNaN(val)) return false;
    var x = parseFloat(val);
    return Math.round(x) === x;
}
export function isVal(val:any) { return !(isUndef(val) || isNull(val)); }
export function isDefinedAndNotNull(val:any) {
    if (isUndef(val)) {
        return false;
    }
    return val !== null;
}