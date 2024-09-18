// Deck 52 cards suits, rank, and value
class Deck {
    constructor() {
        this.deck = [];
        this.cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
    }

    makeDeck() {
        this.deck = [];
        for (let i = 0; i < this.cardSuits.length; i++) {
            for (let r = 0; r < this.cardRanks.length; r++) {
                let card = {
                    value: r + 1,  // value is rank + 1 for A, J, Q and K
                    name: `${this.cardRanks[r]} of ${this.cardSuits[i]}`
                };
                this.deck.push(card);
            }
        }
    }
// fisher yates shuffle solution
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}
// establish players and score and allows cards to be moved to the hand array
class Players {
    constructor() {
        this.player1 = {
            name: "Player 1",
            score: 0,
            hand: []
        };
        this.player2 = {
            name: "Player 2",
            score: 0,
            hand: []
        };
    }
}

class Game {
    constructor() {
        this.deck = new Deck();
        this.players = new Players();
        this.warPile = [];
    }
 // moves shuffled deck to player1 & 2 hand array
    dealCards() {
        this.deck.makeDeck();
        this.deck.shuffle();
        while (this.deck.deck.length > 0) {
            this.players.player1.hand.push(this.deck.deck.shift());
            this.players.player2.hand.push(this.deck.deck.shift());
        }
    }
// handles potential results from a round of war
    war(card1, card2) {
        console.log("War!");

        if (card1.value > card2.value) {
            console.log(`${this.players.player1.name} wins the war!`);
            this.players.player1.hand.push(card1, card2, ...this.warPile);
            this.players.player1.score++;
        } else if (card1.value < card2.value) {
            console.log(`${this.players.player2.name} wins the war!`);
            this.players.player2.hand.push(card1, card2, ...this.warPile);
            this.players.player2.score++;
        } else {
            console.log("Another tie in the war. Additional cards will be added to the war pile.");
            this.warPile.push(card1, card2);
        }


    // Logic of war to ensure the game is played correctly
    playRound() {
        if (this.players.player1.hand.length === 0 || this.players.player2.hand.length === 0) {
            return false; // End the game if either player has no cards
        }

        let card1 = this.players.player1.hand.shift();
        let card2 = this.players.player2.hand.shift();

        console.log(`${this.players.player1.name} drew ${card1.name}`);
        console.log(`${this.players.player2.name} drew ${card2.name}`);

        if (card1.value === card2.value) {
            console.log("It's a tie!");
            this.war(card1, card2);
        } else if (card1.value > card2.value) {
            console.log(`${this.players.player1.name} wins this round!`);
            this.players.player1.hand.push(card1, card2);
            this.players.player1.score++;
        } else {
            console.log(`${this.players.player2.name} wins this round!`);
            this.players.player2.hand.push(card1, card2);
            this.players.player2.score++;
        }

        return true;
    }
 // will play war once the rules have been established and hands delt
    playGame() {
        this.dealCards();
        let round = 1;
        while (round <= 26) { // Play exactly 26 rounds
            console.log(`Round ${round}`);
            this.playRound();
            console.log(`Player 1 cards remaining: ${this.players.player1.hand.length}`);
            console.log(`Player 2 cards remaining: ${this.players.player2.hand.length}`);
            round++;
        }
        console.log("Game Over!");
        console.log(`${this.players.player1.name} score: ${this.players.player1.score}`);
        console.log(`${this.players.player2.name} score: ${this.players.player2.score}`);
    }
}

// Start game
const game = new Game();
game.playGame();