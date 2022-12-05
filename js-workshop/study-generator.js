let dizi = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let is_even = n => {
    console.log(`is_even(${n})`)
    return n % 2 == 0;
}
let to_cube = m => {
    console.log(`to_cube(${m})`)
    return m * m * m;
}
let accumulate = (s,u) => {
    console.log(`accumulate(${s},${u})`)
    s += u;
    return s;
}
let filter = function* (arr, predicate){
    for(let x of arr)
        if (predicate(x))
            yield x;
}

let map = function* (arr, mapper){
    for(let x of arr)
        yield mapper(x);
}

let reduce = function (arr, reducer, init){
    let sum=init;
    for(let x of arr)
        sum=reducer(sum,x);
    return sum;
}

sum = reduce(map(filter(dizi,is_even),to_cube),accumulate, 0);
console.log(`sum: ${sum}`)