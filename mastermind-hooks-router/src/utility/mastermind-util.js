export function createRandomDigit(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
};

export function createSecret(level) {
    let digits = [createRandomDigit(1, 9)];
    while (digits.length < level) {
        let digit = createRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let secret = digits.reduce((n, d) => 10 * n + d, 0);
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