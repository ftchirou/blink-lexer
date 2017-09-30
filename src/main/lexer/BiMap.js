import { fromArrays } from './objectUtils';

export default class BiMap {
    constructor(obj) {
        this.map = obj;
        this._keys = Object.keys(obj);
        this._values = Object.values(obj)
        this.reversed = fromArrays(this._values, this._keys)
    }

    getKeyFor(value) {
        return this.reversed[value]
    }

    getValue(key) {
        return this.map[key]
    }

    hasValue(value) {
        return this.reversed.hasOwnProperty(value)
    }

    get keys() {
        return this._keys
    }

    get values() {
        return this._values
    }

    get object() {
        return this.map
    }
}