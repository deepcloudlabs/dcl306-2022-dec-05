## MasterMind Game

Mastermind is a simple number guessing game. Computer picks a **3-digit** random number where all digits are distinct.
This number is a secret and a player tries to find the secret by guessing. Computer guides the player with a hint
message summarizing how much the guess is close the secret. Assume that the secret number is **549** and player's first
move is **123**. Computer evaluates the input **123** and produces "No Match!" message, hence there is no digit matched!
Player's next move is **456**. Computer again evaluates the input 456 and produces the message **"-2"**: The digits 4
and 5 are all matched but at the very wrong places! Player's next move is **567**. Computer again evaluates the input **
567** and produces the message **"+1"**:
Only one digit is matched at the correct place! Player's next move is **584**. Computer again evaluates the input **
584** and produces the message **"+1-1"**: The digit 5 is matched at the correct place and the digit 4 is matched at the
wrong place. Player's next move is **540**. Computer again evaluates the input **540** and produces the message **"
+2"**: The digits 5 and 4 are all matched at the correct places! Finally, the player inputs **549** and wins the game!

```
Game Level : 3 
Secret : 549 
Player tries to guess the secret: 
    123 -> No Match 
    456 -> -2 
    574 -> -1 +1 
    548 -> +2 549 -> Next Game Level: 4 
    ... 
    Game Level: 10 -> Player wins!

60 + 10 * (Game Level - 3) seconds 
Number of moves: 10 + 2 * (Game Level - 3)
3 Lives +1 Live at each level
```

## Local Storage

The **Web Storage API** is a set of mechanisms that enable browsers to store key-value pairs. It is designed to be much
more intuitive than using cookies.

The key-value pairs represent storage objects, which are similar to objects except they remain intact during page loads,
and are always strings.

The Web Storage API consists of two mechanisms: **sessionStorage** and **localStorage**. Both **sessionStorage** and **
localStorage** maintain a separate storage area for each available origin for the duration of the page session.

The main difference between **sessionStorage** and **localStorage** is that sessionStorage only maintains a storage area
while the browser is open (including when the page reloads or restores) while **localStorage** continues to store data
after the browser is closed. In other words, whereas data stored in **sessionStorage** is cleared when the page is
closed, data stored in **localStorage** does not expire.

**localStorage** is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no
expiration date. This means the data stored in the browser will persist even after the browser window is closed.

To use localStorage in your web applications, there are five methods to choose from:

- **setItem()**: Add key and value to localStorage
- **getItem()**: This is how you get items from localStorage
- **removeItem()**: Remove an item by key from localStorage
- **clear()**: Clear all localStorage
- **key()**: Passed a number to retrieve the key of a localStorage
