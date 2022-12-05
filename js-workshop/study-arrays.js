let numbers = [42, 8, 15, 16, 23, 4]
console.log(numbers)
// [42, 8, 15, 16, 23, 4]
let numericOrderAsc = (x, y) => x - y;
let numericOrderDesc = (x, y) => y - x;
numbers.sort(numericOrderAsc)
console.log(numbers)
numbers.sort(numericOrderDesc)
console.log(numbers)
// [15, 16, 23, 4, 42, 8]
