import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import {useEffect, useReducer} from "react";
import FormGroup from "./component/common/form-group";
import Badge from "./component/common/badge";
import GameStatistics from "./component/statistics/game-statistics";
import MoveEvaluation from "./component/mastermind/move-evaluation";
import TableHead from "./component/common/table-head";
import {
    createSecret,
    loadGameStateFromLocalStorage,
    loadGameStatisticsFromLocalStorage
} from "./utility/mastermind-util";
import gameReducer from "./reducers/game-reducer";
import statisticsReducer from "./reducers/statistics-reducer";

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

let initialStatisticsState = {
    wins: 0,
    loses: 0
};

function Mastermind() {
    let gameState = loadGameStateFromLocalStorage();
    if (gameState && gameState.game) {
        initialGameState = gameState.game;
        if (initialGameState.level < 3 || initialGameState.level > 10)
            initialGameState = 3;
    }

    let gameStatistics = loadGameStatisticsFromLocalStorage();
    if (gameStatistics && gameStatistics.statistics) {
        initialStatisticsState = gameStatistics.statistics;
    }

    const [game, dispatchGame] = useReducer(
        gameReducer,
        initialGameState
    );
    const [statistics, dispatchStatistics] = useReducer(
        statisticsReducer,
        initialStatisticsState
    );

    useEffect(() => {
        let timerId = setInterval(countDown, 1000);
        return () => {
            clearInterval(timerId);
        }
    });


    let countDown = () => {
        dispatchGame({
            "type": "COUNT_DOWN",
            "dispatchStatistics": dispatchStatistics
        })
    };

    let handleInput = (event) => {
        event.preventDefault();
        dispatchGame({
            "type": "INPUT_CHANGE",
            "data": Number(event.target.value)
        });
    };

    let play = (event) => {
        event.preventDefault();
        dispatchGame({
            "type": "PLAY",
            "dispatchStatistics": dispatchStatistics
        });
    };

    return (
        <>
            <p></p>
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
        </>
    );
}

export default Mastermind;
