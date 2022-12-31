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
    return digits.reduce((n, d) => 10 * n + d, 0);
};


export function saveGameStateToLocalStorage(game) {
    localStorage.setItem("mastermind-game", JSON.stringify({game: {...game}}));
}

export function saveGameStatisticsToLocalStorage(statistics) {
    localStorage.setItem("mastermind-statistics", JSON.stringify({statistics: {...statistics}}));
}

export function loadGameStateFromLocalStorage() {
    let localStorageMastermindState = localStorage.getItem("mastermind-game");
    if (localStorageMastermindState) {
        return JSON.parse(localStorageMastermindState);
    }
}

export function loadGameStatisticsFromLocalStorage() {
    let localStorageMastermindStatistics = localStorage.getItem("mastermind-statistics");
    if (localStorageMastermindStatistics) {
        return JSON.parse(localStorageMastermindStatistics);
    }
}