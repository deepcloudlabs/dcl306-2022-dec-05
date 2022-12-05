let dizi = [42, 8, 15, 16, 23, 4]
let sum = 0
for (let number of dizi) { // external loop
    if (number % 2 == 0) {
        let cubed = number * number * number
        sum += cubed
    }
}
console.log(`sum: ${sum}`)

sum =
dizi.filter(n => n % 2 == 0) // internal loop
    .map(m => m * m * m)
    .reduce((s, u) => s + u, 0)
console.log(`sum: ${sum}`)
