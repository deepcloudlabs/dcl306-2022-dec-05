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
import {useNavigate} from "react-router";

function Mastermind() {
    let [game, setGame] = useState({
        level: 3,
        secret: 123,
        tries: 0,
        maxTries: 10,
        counter: 60,
        guess: 123,
        lives: 3,
        moves: [],
        pbCounterClass: "progress-bar bg-primary",
        pbCounterStyle: {width: "100%"}
    });
    let [statistics, setStatistics] = useState({
        wins: 0,
        loses: 0
    });
    useEffect(() => {
        let timerId = setInterval(countDown, 1000);
        let state = loadGameStateFromLocalStorage();
        return () => {
            clearInterval(timerId);
        }
    });
    let navigate = useNavigate();

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
            newGame.lives--;
            if (newGame.lives === 0) {
                navigate("/loses", {replace: true});
                return;
            }
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
            newGame.lives += 2;
            newStatistics.wins++;
            if (newGame.level >= 10) {
                navigate("/wins", {replace: true});
            }
            initializeGame(newGame);
        } else {
            if (newGame.tries >= newGame.maxTries) {
                newStatistics.loses++;
                newGame.lives--;
                if (newGame.lives === 0) {
                    navigate("/loses", {replace: true});
                }
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
                        <Badge label="Max Tries" className="bg-danger" value={game.maxTries}></Badge>
                    </FormGroup>
                    <FormGroup>
                        <Badge label="Lives" className="bg-secondary" value={game.lives}></Badge>
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
