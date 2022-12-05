import React from "react"
import './App.css';
import CardHeader from "./component/card-header";
import Badge from "./component/badge";
import Move from "./model/move";
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
                guess: 123,
                moves: []
            },
            statistics: {
                wins: 0,
                loses: 0
            }
        };
        /*
        setInterval(()=>{
            let game = {...this.state.game};
            game.tries++;
            this.setState({game},() =>{
               console.log(this.state.game.tries+", "+game.tries)
            }); // {"game": game}
        }, 1000)
         */
        this.handleInput = this.handleInput.bind(this);
        this.play = this.play.bind(this);
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
    }

    handleInput(event) {
        let game = {...this.state.game};
        game.guess = Number(event.target.value);
        this.setState({game});
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
        game.tries++;
        if (game.guess === game.secret) {
            game.level++;
            if (game.level > 10) {
                //TODO: Player wins the game
            }
            this.initializeGame(game);
        } else {
            game.moves.push(this.evaluateMove(game.guess, game.secret));
        }
        this.setState({game});
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <CardHeader title="Game Console"></CardHeader>
                    <div className="card-body">
                        <div className="form-group">
                            <Badge label="Game Level" className="bg-info" value={this.state.game.level}></Badge>
                        </div>
                        <div className="form-group">
                            <Badge label="Tries" className="bg-success" value={this.state.game.tries}></Badge>
                        </div>
                        <div className="form-group">
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
                        </div>
                    </div>
                </div>
                <div className="card">
                    <CardHeader title="Moves"></CardHeader>
                    <div className="card-body">
                        <table className="table table-bordered table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Guess</th>
                                    <th>Perfect Match</th>
                                    <th>Partial Match</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.game.moves.map((move,index)=>
                                    <tr key={move.guess + index.toString()}>
                                        <td>{index+1}</td>
                                        <td>{move.guess}</td>
                                        <td>{move.perfectMatch}</td>
                                        <td>{move.partialMatch}</td>
                                        <td>{move.message}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
