/**
Author: Paul Hoefgen
A guessing game.
**/

function buildDeck() {
  deck = cardTypes;
  // Double the deck
  var gameDeck = deck.concat(deck);
  return gameDeck;
}

function createGame() {

  game = new Game();

  // Take the static list of card types, build a deck of 16 cards with two of each card type. Store the
  // list of cardtypes as an array.
  randomDeck = shuffleDeck(buildDeck());

  // Build an array of card objects from the randomized card types.
  randomDeck.forEach(function(cardType){
    game.gameDeck.push(new Card(cardType));
  });
  return game;
}

function setField(gameDeck) {
  // Takes a shuffled, random deck and displays it.
  const cardHTML =  '<li class="card">' +
                    '  <i class="fa %cardType%"></i>' +
                    '</li>';

  gameDeck.forEach(function(card) {
    newCard = cardHTML.replace("%cardType%", card.cardType);
    $('#card-field').append(newCard);
  });
}

function listen(game) {
  // Detect player choices (click cards)
  $('.card').on("click", function() {
    game.cardClicked(game, $(this).index());
  });

  // Restart game
  $('.restart').on("click", function() {
    location.reload();
  });
  $('#game_reset').on("click", function() {
    location.reload();
  });
}

function gameLoop() {
  game = createGame();
  setField(game.gameDeck);
  startCount();
  listen(game);
}

gameLoop();



