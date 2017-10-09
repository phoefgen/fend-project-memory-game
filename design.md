### Memory Game Design

##### Game loop

0) User clicks `Restart` or page loads GOTO 1

1) Create a new game
    - shuffle cards
    - display hidden card grid
    - set turns to 0 
    - set rating to 3
    
2) User clicks hidden card
    - Create turn object
    - Display card

3) User clicks hidden card
    - update turn object
    - Display card
    - check guess outcome
    - update game with turn outcome
    - check for endgame conditions: GOTO 5

4) GOTO 2

5) Game reaches endgame condition
    - display endgame splash 
        

#### Objects

#### Card

Card has these attributes:
- Face Value: String
- Discovered State: Boolean
- Active Guess state: Boolean

Card has these methods:
##### getValue
    ###### REQUIRES: 
      - None
    ###### GUARANTEES:
      - Returns a string that represents the face value of a card.
      - String is in a known set from a static list.


##### flipCard
    ###### REQUIRES:
      - None
    ###### GUARANTEES:
      - Card object will be updated on the DOM with new CSS classes
      - Card will display the inverse of the current state on the UI
      
##### destroyCard
    ###### REQUIRES:
    - None
    ###### GUARANTEES:
    - Card will be updated to a visually dormant state in the UI


#### Turn

Turn has these attributes:
- first guess
- second guess

Turn has these methods:
##### checkGuess
    ###### REQUIRES:
    - Two integers, that represent the array position of two cards. 
    - The current game object
    ###### GUARANTEES:

#### Game

- Current arrangement of cards: Array
- Number of turns: Int
- Game Rating: Int

Game has these methods: 

##### shuffleDeck
    ###### REQUIRES:
    - None
    ###### GUARANTEES:
    - Random deck is created
##### startNewGame
    ###### REQUIRES:
    - None
    ###### GUARANTEES:
    - Returns a new game object
##### endGame
    ###### REQUIRES:
    - None
    ###### GUARANTEES:
    - Updates UI with end game stats. 
##### startGuess
    ###### REQUIRES:
    - Integer reflecting the array position of the guess
    ###### GUARANTEES:
    -
##### finishGuess
    ###### REQUIRES:
    ###### GUARANTEES:
##### updateRating
    ###### REQUIRES:
    ###### GUARANTEES:
##### displayScore
    ###### REQUIRES:
    ###### GUARANTEES:
##### restartGame
    ###### REQUIRES:
    ###### GUARANTEES:
##### timerStart
    ###### REQUIRES:
    ###### GUARANTEES:
##### timerStop
    ###### REQUIRES:
    ###### GUARANTEES:
##### updateMoves
    ###### REQUIRES:
    ###### GUARANTEES:








    