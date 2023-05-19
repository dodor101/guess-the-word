// select DOM Elements
let wordBlank = document.querySelector('.word-blanks');
let win = document.querySelector('.win');
let lose = document.querySelector('.lose');
let timerElement = document.querySelector('.timer-count');
let startBtn = document.querySelector('.start-button');

// define initial state variables
let wordChoice = '';
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

// arrays used to create blanks and letters on the screen
let lettersInChosenWord = [];
let blanksLetters = [];

// words options
let wordsOptions = ['variable', 'array', 'modulus', 'object', 'function', 'string', 'boolean'];

// get wins and loses

function init() {
  getWins();
  getLosses();
}
// function to start the game on button clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startBtn.disabled = true;
  renderBlanks();
  startTimer();
}

// lets define a win function for when a win condition is met
function winGame() {
  wordBlank.textContent = 'YOU WON!!!🏆 ';
  winCounter++;
  startBtn.disabled = false;
  setWins();
}

// define a function for when the user losses the game
function loseGame() {
  wordBlank.textContent = 'GAME OVER';
  loseCounter++;
  startBtn.disabled = false;
  setLosses();
}

// define a timer function the triggers winGame() and looseGame()
function startTimer() {
  timer = setInterval(() => {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // check if the win condition is met
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }
    // lets check if time runs out
    if (timerCount === 0) {
      // lets clear interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}
// create blanks on the screen
function renderBlanks() {
  // lets pick random words from the array options
  wordChoice = wordsOptions[Math.floor(Math.random() * wordsOptions.length)];
  lettersInChosenWord = wordChoice.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];
  for (let i = 0; i < numBlanks.length; i++) {
    blanksLetters.push("_");

  }
  wordBlank.textContent = blanksLetters.join(' ');
}

//  let's define our set win function
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem('winCount', winCounter);
}

//  let's define our set losses function
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem('loseCount', loseCounter);
}

function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem('winCount');
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

// define our getLosses function
function getLosses() {
  let storeLosses = localStorage.getItem('loseCount');
  // let's check the store is empty
  if (storeLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storeLosses;
  }
  // let's render loses to the view
  lose.textContent = loseCounter;
}

// let's define the checkWin()
function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (wordChoice === blanksLetters.join("")) {
    // If the word equals the blankLetters array when converted to string, set isWin to true
    isWin = true;
  }
}

// check if the letter the player presses in the guessing word
function checkLetters(letter) {
  let letterInWord = false;
  /// loop over the blanks and replace them by the key press if true
  for (let i = 0; i < numBlanks; i++) {
    if (wordChoice[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (wordChoice[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// lets create an event on the document to listen for key event
document.addEventListener('keydown', (event) => {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  let key = event.key.toLowerCase();
  let alphabetNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    let letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startBtn.addEventListener('click', startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
let resetButton = document.querySelector('.reset-button');

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins();
  setLosses();
}
// Attaches event listener to button
resetButton.addEventListener('click', resetGame);
