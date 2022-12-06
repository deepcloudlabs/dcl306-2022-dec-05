import React from "react"
import './App.css';
import CardHeader from "./component/common/card-header";
import Badge from "./component/common/badge";
import Move from "./model/move";
import FormGroup from "./component/common/form-group";
import Card from "./component/common/card";
import TableHead from "./component/common/table-head";
import CardBody from "./component/common/card-body";
import Container from "./component/common/container";
import GameStatistics from "./component/statistics/game-statistics";
import MoveEvaluation from "./component/mastermind/move-evaluation";
// Component:
// 1. function-based: stateless component
// 2. class-based: stateful component
// 3. hooks: stateful component -> function-based
/**
 * level: 3
 * secret: 549
 * 123 -> No match!
 * 456 -> -2
 * 574 -> -1+1
 * 548 -> +2
 * 549 -> Game Level: 4 ->
 */
class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            game: {
                level: 3,
                secret: this.createSecret(3),
                tries: 0,
                maxTries: 10,
                counter: 60,
                guess: 123,
                moves: [],
                pbCounterClass: "progress-bar bg-primary",
                pbCounterStyle: {width: "100%"}
            },
            statistics: {
                wins: 0,
                loses: 0
            }
        };
        this.play = this.play.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    countDown = () => {
        let game = {...this.state.game};
        let statistics = {...this.state.statistics};
        game.counter--;
        game.pbCounterStyle = {width: Math.round((game.counter * 5) / 3).toString().concat("%")};
        if (game.counter <= 20) {
            game.pbCounterClass = "progress-bar bg-danger";
        } else if (game.counter <= 40) {
            game.pbCounterClass = "progress-bar bg-warning";
        } else {
            game.pbCounterClass = "progress-bar bg-primary";
        }
        if (game.counter <= 0) {
            statistics.loses++;
            this.initializeGame(game)
        }
        this.setState({game, statistics}, this.saveGameStateToLocalStorage);
    }

    componentDidMount() {
        this.timerId = setInterval(this.countDown, 1000);
        let localStorageMastermindState = localStorage.getItem("mastermind-game");
        if (localStorageMastermindState) {
            let {game, statistics} = JSON.parse(localStorageMastermindState);
            this.setState({game, statistics});
        } else {
            this.saveGameStateToLocalStorage();
        }
    }

    saveGameStateToLocalStorage = () => {
        let {game, statistics} = {...this.state};
        localStorage.setItem("mastermind-game", JSON.stringify({game, statistics}));
    }

    createRandomDigit = (min, max) => {
        return Math.floor((max - min + 1) * Math.random()) + min;
    }

    createSecret = (level) => {
        let digits = [this.createRandomDigit(1, 9)];
        while (digits.length < level) {
            let digit = this.createRandomDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        let secret = digits.reduce((n, d) => 10 * n + d, 0);
        console.log(secret);
        return secret;
    }

    initializeGame = (game) => {
        game.tries = 0;
        game.moves = [];
        game.secret = this.createSecret(game.level);
        game.counter = 60;
        game.pbCounterClass = "progress-bar bg-primary";
        game.pbCounterStyle = {width: "100%"};
    }

    handleInput(event) {
        let game = {...this.state.game};
        game.guess = Number(event.target.value);
        this.setState({game},this.saveGameStateToLocalStorage);
    }

    evaluateMove = (guess, secret) => {
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
    }

    play() {
        let game = {...this.state.game}
        let statistics = {...this.state.statistics}
        game.tries++;
        if (game.guess === game.secret) {
            game.level++;
            statistics.wins++;
            if (game.level > 10) {
                //TODO: Player wins the game
            }
            this.initializeGame(game);
        } else {
            if (game.tries >= game.maxTries) {
                statistics.loses++;
                this.initializeGame(game);
            } else {
                game.moves.push(this.evaluateMove(game.guess, game.secret));
            }
        }
        this.setState({game, statistics}, this.saveGameStateToLocalStorage);
    }

    render() {
        return (
            <Container>
                <Card>
                    <CardHeader title="Game Console"></CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Badge label="Game Level" className="bg-info" value={this.state.game.level}></Badge>
                        </FormGroup>
                        <FormGroup show={this.state.game.tries > 0}>
                            <Badge label="Tries" className="bg-success" value={this.state.game.tries}></Badge>
                            <Badge label="Max Tries" className="bg-danger" value={this.state.game.maxTries}></Badge>
                        </FormGroup>
                        <FormGroup>
                            <h4 className="card-title">Counter:
                                <div className="progress">
                                    <div className={this.state.game.pbCounterClass}
                                         style={this.state.game.pbCounterStyle}>{this.state.game.counter}</div>
                                </div>
                            </h4>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="guess">Guess:</label>
                            <input type="text"
                                   id="guess"
                                   name="guess"
                                   className="form-control"
                                   onChange={this.handleInput}
                                   value={this.state.game.guess}></input>
                            <button onClick={this.play}
                                    className="btn btn-success">Play
                            </button>
                        </FormGroup>
                    </CardBody>
                </Card>
                <p></p>
                <Card show={this.state.game.moves.length > 0}>
                    <CardHeader title="Moves"></CardHeader>
                    <CardBody>
                        <table className="table table-bordered table-responsive table-striped">
                            <TableHead headers="No,Guess,Message"/>
                            <tbody>
                            {
                                this.state.game.moves.map((move, index) =>
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
                <GameStatistics statistics={this.state.statistics}/>
            </Container>
        );
    }
}

export default App;
