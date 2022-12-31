import Move from "../model/move";
import {createSecret, saveGameStateToLocalStorage} from "../utility/mastermind-util";

export default function gameReducer(game, action) {
    switch (action.type) {
        case 'PLAY': {
            let newGame = {...game}
            newGame.tries++;
            if (newGame.guess === newGame.secret) {
                newGame.level++;
                action.dispatchStatistics({type: "PLAYER_WINS"});
                if (newGame.level > 10) {
                    //TODO: Player wins the game
                }
                initializeGame(newGame);
            } else {
                if (newGame.tries >= newGame.maxTries) {
                    action.dispatchStatistics({type: "PLAYER_LOSES"});
                    initializeGame(newGame);
                } else {
                    newGame.moves.push(new Move(newGame.guess, newGame.secret));
                }
            }
            saveGameStateToLocalStorage(newGame)
            return newGame;
        }
        case 'INPUT_CHANGE': {
            let guess = Number(action.data);
            return {...game, guess};
        }
        case 'COUNT_DOWN': {
            let newGame = {...game};
            newGame.counter = newGame.counter - 1;
            if (newGame.counter <= 0) {
                action.dispatchStatistics({type: "PLAYER_LOSES"});
                initializeGame(newGame);
                return newGame;
            }
            updateProgressBar(newGame, {low: 20, high: 40});
            saveGameStateToLocalStorage(newGame)
            return newGame;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let updateProgressBar = (newGame, {low, high}) => {
    newGame.pbCounterStyle = {width: (Math.ceil((newGame.counter * 5) / 3)).toString().concat("%")}
    if (newGame.counter <= low) {
        newGame.pbCounterClass = "progress-bar bg-danger";
    } else if (newGame.counter <= high) {
        newGame.pbCounterClass = "progress-bar bg-warning";
    } else {
        newGame.pbCounterClass = "progress-bar bg-primary";
    }
};

let initializeGame = (game) => {
    game.tries = 0;
    game.moves = [];
    game.secret = createSecret(game.level);
    game.counter = 60;
    game.pbCounterClass = "progress-bar bg-primary";
    game.pbCounterStyle = {width: "100%"};
};