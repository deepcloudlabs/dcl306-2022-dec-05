import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import {useState} from "react";
import FormGroup from "./component/common/form-group";
import Badge from "./component/common/badge";
import Move from "./model/move";
import GameStatistics from "./component/statistics/game-statistics";
import MoveEvaluation from "./component/mastermind/move-evaluation";
import TableHead from "./component/common/table-head";

function Mastermind() {
    let [game, setGame] = useState({
        level: 3,
        secret: 123,
        tries: 0,
        maxTries: 10,
        counter: 60,
        guess: 123,
        moves: [],
        pbCounterClass: "progress-bar bg-primary",
        pbCounterStyle: {width: "100%"}
    });
    let [statistics, setStatistics] = useState({
        wins: 0,
        loses: 0
    });
    let handleInput = (event) => {
        let newGame = {...game};
        newGame.guess = Number(event.target.value);
        setGame(newGame);
    };
    let createRandomDigit = (min, max) => {
        return Math.floor((max - min + 1) * Math.random()) + min;
    };
    let createSecret = (level) => {
        let digits = [createRandomDigit(1, 9)];
        while (digits.length < level) {
            let digit = createRandomDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        return digits.reduce((n, d) => 10 * n + d, 0);
    };
    let initializeGame = (game) => {
        game.tries = 0;
        game.moves = [];
        game.secret = createSecret(game.level);
        game.counter = 60;
        game.pbCounterClass = "progress-bar bg-primary";
        game.pbCounterStyle = {width: "100%"};
    };
    let evaluateMove = (guess, secret) => {
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i = 0; i < guessAsString.length; i++) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; j++) {
                let s = secretAsString.charAt(j);
                if (g === s) {
                    if (i === j) {
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        let message = "";
        if (perfectMatch === 0 && partialMatch === 0) {
            message = "No Match";
        } else {
            if (partialMatch > 0) message += `-${partialMatch}`;
            if (perfectMatch > 0) message += `+${perfectMatch}`;
        }
        return new Move(guess, perfectMatch, partialMatch, message);
    };
    let play = () => {
        let newGame = {...game}
        let newStatistics = {...statistics}
        newGame.tries++;
        if (newGame.guess === newGame.secret) {
            newGame.level++;
            newStatistics.wins++;
            if (newGame.level > 10) {
                //TODO: Player wins the game
            }
            initializeGame(newGame);
        } else {
            if (newGame.tries >= newGame.maxTries) {
                newStatistics.loses++;
                initializeGame(newGame);
            } else {
                newGame.moves.push(evaluateMove(newGame.guess, newGame.secret));
            }
        }
        setGame(newGame);
        setStatistics(newStatistics);
    };
    return (
        <Container>
            <Card>
                <CardHeader title="Game Console"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Badge label="Game Level" className="bg-info" value={game.level}></Badge>
                    </FormGroup>
                    <FormGroup show={game.tries > 0}>
                        <Badge label="Tries" className="bg-success" value={game.tries}></Badge>
                        <Badge label="Max Tries" className="bg-danger" value={game.maxTries}></Badge>
                    </FormGroup>
                    <FormGroup>
                        <h4 className="card-title">Counter:
                            <div className="progress">
                                <div className={game.pbCounterClass}
                                     style={game.pbCounterStyle}>{game.counter}</div>
                            </div>
                        </h4>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="guess">Guess:</label>
                        <input type="text"
                               id="guess"
                               name="guess"
                               className="form-control"
                               onChange={handleInput}
                               value={game.guess}></input>
                        <button onClick={play} className="btn btn-success">Play</button>
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
            <Card show={game.moves.length > 0}>
                <CardHeader title="Moves"></CardHeader>
                <CardBody>
                    <table className="table table-bordered table-responsive table-striped">
                        <TableHead headers="No,Guess,Message"/>
                        <tbody>
                        {
                            game.moves.map((move, index) =>
                                <tr key={move.guess + index.toString()}>
                                    <td>{index + 1}</td>
                                    <td>{move.guess}</td>
                                    <td><MoveEvaluation move={move}/></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <p></p>
            <GameStatistics statistics={statistics}/>
        </Container>
    );
}

export default Mastermind;
