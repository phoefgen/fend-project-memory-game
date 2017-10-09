/**
Sets up the various objects for use in the game loop.
**/

// Helper utils:
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleDeck(deck) {
  let currentIndex = deck.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }

  return deck;
}

const cardHTML =  '<li class="card">' +
                  '  <i class="fa %cardType%"></i>' +
                  '</li>';

// Returns A static list of card types.
const cardTypes = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-bicycle",
    "fa-bomb",
    "fa-leaf"];

// Card Class.
const Card = class  {
  constructor(cardType){
    this.cardType = cardType;
    this.discovered = false;
    this.activeGuess = false;
  }
  setActiveState(activeState) {
    this.activeGuess = activeState;
  }

}

/*Card.prototype.flipCard = function () {
  // TODO: manipulate CSS to flip the card from the
  // Current state to another.
}

Card.prototype.destroyCard = function () {
  // TODO: change CSS for the card to a dormant state
};
*/

class Turn {
  constructor() {
    // Creates a turn
    let firstGuess = "";
    let secondGuess = "";
   }
   getTurn(){
     let turnResult = [firstGuess, secondGuess];
     return turnResult;
   }
  }



 /* checkGuess() {
    if (firstGuess == secondGuess) {
      return true;

      else {
        return false;
      }
    }
  }
}
*/
const Game = class {
  constructor() {
    //Sets up a new game object
    this.gameDeck = [];
    this.gameTurns = 0;
    this.gameRating = 3;
    this.turnInProgress = false;
    this.gameOver = false;
  }

  cardClicked(game, clickedCard){
    if (this.turnInProgress) {
      // Handle second turn of card.
      console.log('Second turn: ' + game.gameDeck[clickedCard].cardType);
      this.flipCard(game, clickedCard);

      this.turnInProgress = false;
    } else {
      // Handle first turn of card.
      console.log('First Turn: ' + game.gameDeck[clickedCard].cardType);
      this.turnInProgress = true;
      this.flipCard(game, clickedCard);

    }
  }
  flipCard(game, cardIndex){
    console.log("index" + cardIndex);
    $('#card-field').children().eq(cardIndex).addClass("open show");
}
};

