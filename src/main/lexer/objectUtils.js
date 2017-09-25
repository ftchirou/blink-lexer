export const fromArrays = (keys, values) => {
    return keys.reduce(
        (result, k, index) => {
            result[k] = values[index];
            return result;
        }
        , {})
}

export const reverse = obj => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return fromArrays(values, keys)
};