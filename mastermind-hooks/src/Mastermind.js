import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import {useEffect, useState} from "react";
import FormGroup from "./component/common/form-group";
import Badge from "./component/common/badge";
import Move from "./model/move";
import GameStatistics from "./component/statistics/game-statistics";
import MoveEvaluation from "./component/mastermind/move-evaluation";
import TableHead from "./component/common/table-head";
import {createSecret, loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from "./utility/mastermind-util";

function Mastermind() {
    let initialGameState = {
        level: 3,
        secret: createSecret(3),
        tries: 0,
        maxTries: 10,
        counter: 60,
        guess: 123,
        moves: [],
        pbCounterClass: "progress-bar bg-primary",
        pbCounterStyle: {width: "100%"}
    };
    let state = loadGameStateFromLocalStorage();
    if (state && state.game) {
        initialGameState = state.game;
        if (initialGameState.level < 3 || initialGameState.level > 10)
            initialGameState = 3;
    }
    let initialStatisticsState = {
        wins: 0,
        loses: 0
    };
    if (state && state.statistics) {
        initialStatisticsState = state.statistics;
    }
    let [game, setGame] = useState(initialGameState);
    let [statistics, setStatistics] = useState(initialStatisticsState);
    useEffect(() => {
        let timerId = setInterval(countDown, 1000);
        return () => {
            clearInterval(timerId);
        }
    });

    let updateProgressBar = (newGame, {low, high}) => {
        if (newGame.counter <= low) {
            newGame.pbCounterClass = "progress-bar bg-danger";
        } else if (newGame.counter <= high) {
            newGame.pbCounterClass = "progress-bar bg-warning";
        } else {
            newGame.pbCounterClass = "progress-bar bg-primary";
        }
    };

    let countDown = () => {
        let newGame = {...game};
        let newStatistics = {...statistics};
        newGame.counter--;
        newGame.pbCounterStyle = {width: Math.round((newGame.counter * 5) / 3).toString().concat("%")};
        updateProgressBar(newGame, {low: 30, high: 45});
        if (newGame.counter <= 0) {
            newStatistics.loses++;
            initializeGame(newGame)
        }
        setGame(newGame);
        setStatistics(newStatistics);
        saveGameStateToLocalStorage(newGame, newStatistics);
    };

    let handleInput = (event) => {
        let newGame = {...game};
        newGame.guess = Number(event.target.value);
        setGame(newGame);
    };

    let initializeGame = (game) => {
        game.tries = 0;
        game.moves = [];
        game.secret = createSecret(game.level);
        game.counter = 60;
        game.pbCounterClass = "progress-bar bg-primary";
        game.pbCounterStyle = {width: "100%"};
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
                newGame.moves.push(new Move(newGame.guess, newGame.secret));
            }
        }
        setGame(newGame);
        setStatistics(newStatistics);
        saveGameStateToLocalStorage(newGame, newStatistics);
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
                    </FormGroup>
                    <FormGroup show={game.tries > 0}>
                        <Badge label="Max Tries" className="bg-danger" value={game.maxTries}></Badge>
                    </FormGroup>
                    <FormGroup>
                        <h5 className="card-title">Counter:
                            <div className="progress">
                                <div className={game.pbCounterClass}
                                     style={game.pbCounterStyle}>{game.counter}</div>
                            </div>
                        </h5>
                    </FormGroup>
                    <FormGroup>
                        <label className="form-label" htmlFor="guess">Guess:</label>
                        <div className="input-group mb-3">
                            <input type="text"
                                   id="guess"
                                   name="guess"
                                   className="form-control"
                                   onChange={handleInput}
                                   value={game.guess}></input>
                            <div className="input-group-append">
                                <button onClick={play} className="btn btn-success">Play</button>
                            </div>
                        </div>
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
