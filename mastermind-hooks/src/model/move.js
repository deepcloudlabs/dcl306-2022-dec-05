export default class Move {
    constructor(guess, secret) {
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        this.perfectMatch = 0;
        this.partialMatch = 0;
        for (let i = 0; i < guessAsString.length; i++) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; j++) {
                let s = secretAsString.charAt(j);
                if (g === s) {
                    if (i === j) {
                        this.perfectMatch++;
                    } else {
                        this.partialMatch++;
                    }
                }
            }
        }
        this.message = "";
        if (this.perfectMatch === 0 && this.partialMatch === 0) {
            this.message = "No Match";
        } else {
            if (this.partialMatch > 0) this.message += `-${this.partialMatch}`;
            if (this.perfectMatch > 0) this.message += `+${this.perfectMatch}`;
        }
        this.guess = guess;
    }

}