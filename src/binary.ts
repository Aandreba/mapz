export class BinaryMap<K, V> {
    private inner: [K, V][]
}

export function binarySearch<T> (vals: T[], target: T, start: number = 0, end: number = -1, _cmpFn?: (x: T, y: T) => number | bigint): [boolean, number] {
    const cmpFn = _cmpFn || ((x: T, y: T) => {
        // 'any', 'number', 'bigint'
        if (typeof x === 'number') return x - (y as number);
        if (typeof x === 'bigint') return x - (y as bigint);
        throw `Provided values aren't comparable`
    });

    if (end === -1) end = vals.length;
    
    const half = (end - start) / 2
    if (half === 0) return [false, half]

    const cmp = cmpFn(vals[half], target);
    if (cmp === 0) return [true, half]
    if (cmp < 0) return binarySearch(vals, target, half + 1, end, cmpFn)
    return binarySearch(vals, target, start, half, cmpFn)
}