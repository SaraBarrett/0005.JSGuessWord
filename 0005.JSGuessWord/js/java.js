// global variables
let words = ["aveiro", "beja", "braga", "porto", "lisboa", "faro", "gaia"];
let chosenWord = "";
let guessWord = [];
let wordDisplayElement = document.getElementById("word-display");
let wrongElement = document.getElementById("tries");
let wrongAttempts = 0;
let letterButtons = document.getElementById("letter-buttons");
let solutionElement = document.getElementById("solution");
let errorMessages = ["Game Over! Try again?", "So close! Better luck next time!", "Oops! Don't give up!", "Nice try! Play again?", "Almost had it!"];
let winMessages = ["Congratulations!", "You're a genius!", "Amazing! You got it!", "Well done, word master!", "Perfect! You nailed it!"];
let lettersTried = document.getElementById("letters-tried");
let resetGameBtn = document.getElementById("reset-game");

function fChooseRandomWord() {
  // function to select a word
  let randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

function fDefineUnderScores() {
  chosenWord = fChooseRandomWord();
  guessWord = new Array(chosenWord.length).fill("_");
  wordDisplayElement.textContent = guessWord.join(" ");
}

function fCreateLetterButtons() {
  // generate 26 buttons with the caption of the corresponding letter in lower case

  // cycle to create 26 buttons
  for (let i = 0; i < 26; i++) {
    // define the 26 chars
    const letter = String.fromCharCode(97 + i);
    // create a button element
    const button = document.createElement("button");
    // assign the letter to the button
    button.textContent = letter;

    //add class for identify as a letter btn
    button.classList.add("letter-btn");

    button.addEventListener("click", fCheckLetter);
    // adding a new button to the DIV
    letterButtons.appendChild(button);
  }
}
function fCheckLetter() {
  let letter = this.textContent;

  // disable the clicked button so it can't be selected again
  this.disabled = true;

  // identify if the letter exists and is the same as the secret word
  for (let j = 0; j < chosenWord.length; j++) {
    if (chosenWord[j] === letter) {
      guessWord[j] = letter;
    }
  }

  //count wrong tries
  if (!chosenWord.includes(letter)) {
    //increases wrong letters var
    wrongAttempts++;

    //updates the user interface with the wrong answers
    wrongElement.textContent = wrongAttempts;

    if (wrongAttempts < 2) {
      wrongElement.style.color = "green";
    } else if (wrongAttempts > 1 && wrongAttempts < 4) {
      wrongElement.style.color = "goldenrod";
    } else if (wrongAttempts > 3 && wrongAttempts < 6) {
      wrongElement.style.color = "orange";
    } else {
      wrongElement.style.color = "red";
    }

    let newBtn = document.createElement("button");
    newBtn.textContent = letter;
    lettersTried.appendChild(newBtn);

  }

  //game over when reaches 9 wrong answers
  if (wrongAttempts > 8) {
    solutionElement.textContent = "Solution: " + chosenWord;

    //disable all buttons
    let allBtns = document.querySelectorAll(".letter-btn");
    allBtns.forEach((item) => (item.disabled = true));

    //generate random message with delay so tries displays first
    setTimeout(() => {
      let randomNumber = Math.floor(Math.random() * errorMessages.length);
      alert(errorMessages[randomNumber]);
      resetGameBtn.style.display = "inline-block";
    }, 100);
  }

  wordDisplayElement.textContent = guessWord.join(" ");

  // check if user won (no more underscores in guessWord)
  if (!guessWord.includes("_")) {
    //disable all buttons
    let allBtns = document.querySelectorAll(".letter-btn");
    allBtns.forEach((item) => (item.disabled = true));

    //generate random win message with delay so word displays first
    setTimeout(() => {
      let randomNumber = Math.floor(Math.random() * winMessages.length);
      alert(winMessages[randomNumber]);
      resetGameBtn.style.display = "inline-block";
    }, 100);
  }
}

function fCleanGame() {
  // assuring that the game will be cleaned
  resetGameBtn.style.display = "none";
  wordDisplayElement.textContent = "";
  letterButtons.textContent = "";
  //set attempts to zero
  wrongAttempts = 0;
  wrongElement.textContent = wrongAttempts;
  wrongElement.style.color = "black";
  //clear solution text
  solutionElement.textContent = "";
  //clear letters tried
  lettersTried.replaceChildren();
}
function fInitializeGame() {
  fCleanGame();
  fDefineUnderScores();
  fCreateLetterButtons();
}
