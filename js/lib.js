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

// http://joe-riggs.com/blog/2012/05/javascript-count-up-timer-with-hours-minutes-second-hours-minutes/
const startCount = function()
{
	timer = setInterval(count,1000);
}
const  count = function()
{
	var time_shown = $(".timer").text();
        var time_chunks = time_shown.split(":");
        var hour, mins, secs;

        hour=Number(time_chunks[0]);
        mins=Number(time_chunks[1]);
        secs=Number(time_chunks[2]);
        secs++;
            if (secs==60){
                secs = 0;
                mins=mins + 1;
               }
              if (mins==60){
                mins=0;
                hour=hour + 1;
              }
              if (hour==13){
                hour=1;
              }

        $(".timer").text(hour +":" + plz(mins) + ":" + plz(secs));

}

function plz(digit){

    var zpad = digit + '';
    if (digit < 10) {
        zpad = "0" + zpad;
    }
    return zpad;
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

const Game = class {
  constructor() {
    //Sets up a new game object
    this.gameDeck = [];
    this.gameTurns = 0;
    this.gameRating = 3;
    this.turnInProgress = false;
    this.gameOver = false;
    this.currentGuessA = 'None';
    this.currentGuessB = 'None';
    this.matches = 0;
    this.startTime = $.now();
    this.finishTime = 0;
  }

  cardClicked(game, clickedCard){
    if (this.turnInProgress) {
      // Handle second turn of card.
      console.log('Second turn: ' + game.gameDeck[clickedCard].cardType);
      this.secondTurn(game, clickedCard);
    } else {
      // Cleanup exposed cards and state from last turn
      $('.' + game.currentGuessA ).parent().removeClass("open show");
      $('.' + game.currentGuessB ).parent().removeClass("open show");
      game.currentGuessA = 'None';
      game.currentGuessB = 'None';
      // Handle first turn of card.

      console.log('First Turn: ' + game.gameDeck[clickedCard].cardType);
      this.firstTurn(game, clickedCard);
    }
  }
  openCard(game, cardIndex){
    console.log("index" + cardIndex);
    $('#card-field').children().eq(cardIndex).addClass("open show");
  }
  firstTurn(game, clickedCard){
    // Modify the Game object with the event results
    this.currentGuessA = game.gameDeck[clickedCard].cardType;
    this.turnInProgress = true;
    this.openCard(game, clickedCard);
  }
  secondTurn(game, clickedCard){
    // Modify the Game object with the event results
    this.currentGuessB = game.gameDeck[clickedCard].cardType;
    this.openCard(game, clickedCard);
    this.turnResult(game);
  }
  adjustRating(game){
    // Drive Rating logic
    if (game.gameTurns > 10 && game.gameTurns <= 12) {
      this.gameRating = 2;
    } else if (game.gameTurns > 12 && game.gameTurns < 14) {
      this.gameRating = 1;
    } else if (game.gameTurns > 15) {
      this.gameRating = 0;
    }
    // Update Rating UI
    let currentRating = game.gameRating;
    $('.stars').children().remove();
    while (currentRating > 0) {
      $('.stars').append('<li><i class="fa fa-star"></i></li>');
      currentRating --;
    };

  }
  turnResult(game){
    // Process the results of the turn
    this.gameTurns ++;
    this.turnInProgress = false;
    game.adjustRating(game);
    $('.moves').text(game.gameTurns);

    if (game.currentGuessA == game.currentGuessB) {
      // Disable mouse clicks for cards that have been correctly guessed
    //  $('.' + game.currentGuessA ).parent().css("pointer-events", "none");
      $('.' + game.currentGuessA ).parent().css("opacity", "0.2");
      this.matches ++;
      console.log(this.matches);
      if (this.matches === 1) {
        game.finishTime = $.now();
        game.endGame(game);
      }
    } else {
      console.log("turn result " + game.currentGuessA);
    }
  }
  endGame(game){
    // Remove Play field
    $('#card-field').children().remove();
    $('#card-field').removeClass("deck");
    $('.timer').remove();

    // Determine game time
    var playtime = game.finishTime - game.startTime;
    playtime = game.convertTime(playtime);

    let gameOver = '<div class="gameOver"><h1> Game Over! </h1>' +
                     '<h2> Your Rating:  %rating% Stars!</h2>' +
                     '<h2> Completion Time: %time%' +
                     '<h2> Moves:  %moves%</h2></div>';
    gameOver = gameOver.replace('%rating%', game.gameRating).replace('%moves%',
                              game.gameTurns).replace('%time%', playtime);
    $('#card-field').append(gameOver);
  }
  convertTime(ms) {
    var seconds = Math.floor(ms / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    seconds = seconds - (minutes * 60);
    return hours + 'h: ' + minutes + 'm:' + seconds + '  seconds';
  }
};

