export function createRandomDigit(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
};

export function createSecret(level) {
    let digits = [createRandomDigit(1, 9)];
    console.log(level)
    while (digits.length < 10) {
        let digit = createRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let secret = digits.reduce((n, d) => 10 * n + d, 0);
    console.log(secret);
    return secret;
};


export function saveGameStateToLocalStorage(game,statistics){
    let {newGame, newStatistics} = {...game,...statistics};
    localStorage.setItem(
        "mastermind-game",
        JSON.stringify(
        {game: newGame, statistics: newStatistics}
        )
    );
}

export function loadGameStateFromLocalStorage(){
    let localStorageMastermindState = localStorage.getItem("mastermind-game");
    if (localStorageMastermindState) {
        return JSON.parse(localStorageMastermindState);
    }
}