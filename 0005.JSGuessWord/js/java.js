// global variables
let words = ["aveiro", "beja", "braga", "porto", "lisboa", "faro", "gaia"];
let chosenWord = "";
let guessWord = [];
let wordDisplayElement = document.getElementById("word-display");
let wrongElement = document.getElementById("tries");
let wrongAttempts = 0;
let letterButtons = document.getElementById("letter-buttons");
let solutionElement = document.getElementById("solution");
let errorMessages = ["Game Over", "Bad Luck", "Ups, try latter"];
let winMessages = ["Yay, we're done", "Good Luck!", "Awesome Game"];
let lettersTried = document.getElementById("letters-tried");

function fChooseRandomWord() {
  // function for select a word
  let randomNumber = Math.floor(Math.random() * words.length);

  let single_word = words[randomNumber];

  return single_word;
}

function fDefineUnderScores() {
  chosenWord = fChooseRandomWord();
  guessWord = new Array(chosenWord.length).fill("_");

  document.getElementById("word-display").textContent = guessWord.join(" ");
}

function fCreateLetterButtons() {
  // generate 26 buttons with the caption of the correspondig letter in lower case

  // cycle for create 26 buttons
  for (i = 0; i < 26; i++) {
    // define the 26 chars
    const letter = String.fromCharCode(97 + i);
    // alert(letter);
    // create an object button
    button = document.createElement("button");
    // assign the letter to the butoon
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


  // identify iif the letter exists and is the same of the secret word
  for (j = 0; j < chosenWord.length; j++) {
    if (chosenWord[j] == letter) {
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
      wrongElement.style.color = "yellow";
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

    //generate random message

    let randomNumber = Math.floor(Math.random() * errorMessages.length);
    alert(errorMessages[randomNumber]);

    //disable all buttons
    let allBtns = document.querySelectorAll(".letter-btn");
    allBtns.forEach((item) => (item.disabled = true));
  }

  wordDisplayElement.textContent = guessWord.join(" ");
}

function fCleanGame() {
  // assuring that the game will be cleaned
  wordDisplayElement.textContent = "";
  letterButtons.textContent = "";
  //set attempts to zero
  wrongAttempts = 0;
  wrongElement.textContent = wrongAttempts;
  wrongElement.style.color = "black";

  lettersTried.replaceChildren();
}
function fInitializeGame() {
  fCleanGame();
  fDefineUnderScores();
  fCreateLetterButtons();
}
