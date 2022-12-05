async function get_lottery_numbers(max, size) {
    let numbers = [];
    while (numbers.length < size) {
        let candidate = 1 + Math.floor(Math.random() * max);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort((x, y) => x - y);
    return numbers;
}

get_lottery_numbers(60, 6).then(nums => console.log(nums))
                                  .catch( err => console.error(err));
async function fun(){
    let sayilar = await get_lottery_numbers(60, 6);
    console.log(sayilar);
}

function async_get_lottery_numbers(max, size) {
    return new Promise((resolve,reject) => {
        let numbers = [];
        while (numbers.length < size) {
            let candidate = 1 + Math.floor(Math.random() * max);
            if (numbers.includes(candidate)) continue;
            numbers.push(candidate);
        }
        numbers.sort((x, y) => x - y);
        setTimeout(()=>resolve(numbers), 5000);
    });
}

async_get_lottery_numbers(60,6).then( nums => console.log(nums))
                                       .catch( err => console.error(err));
console.log("async_get_lottery_numbers() is successfully called!")

fun();