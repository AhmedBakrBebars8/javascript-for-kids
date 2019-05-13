var firstStart = 1;
var intro = "Player 1, Enter your secret word.";
var introAfterWordSave = "Player 2, Guess a letter.";

var secret = [];
var strikes = 0;

var winPhrase = document.querySelector(".winPhrase")
var results = document.querySelector(".results")
var attempsLeft = document.querySelector(".attempsLeft")

var submitButton = document.querySelector("#button-save");

var playerTitle = document.querySelector("#player-text");
playerTitle.textContent = intro;

var dashesAndLetters = document.querySelector("#dashesAndLetters");
dashesAndLetters.textContent = '';

var inputField = document.querySelector("#inputField");

var word;
var letter;

submitButton.addEventListener('click',checkGuess)

inputField.addEventListener('keydown' , function(e){
  if(e.keyCode === 13){
    checkGuess();
  }
});

function createSecretDashes(word){
  if(word.length <= 0){
    results.textContent = "please enter a valid value !";
  } else{
    for (i = 0; i < word.length; i++) {
      secret.push("_");
    }
  } 
}

function submitword(){
    word = document.getElementById("inputField").value;
    firstStart = 0;
    createSecretDashes(word);
    dashesAndLetters.textContent = secret.join(' ');
    inputField.value = '';
    playerTitle.textContent = introAfterWordSave;
    inputField.focus();
    
}

function checkGuess(){

  results.textContent = '';
  if(firstStart === 1){
    submitword();
    return;
  }
  if(strikes < 3 && secret.indexOf("_") >= 0) {
    var letter = document.querySelector("#inputField").value;
    if(letter.length > 1){
      inputField.value = "";
      inputField.focus();
      results.textContent = "enter just 1 letter of the word !";
    }
    else if (word.indexOf(letter) < 0) {
      strikes++;
      inputField.value = "";
      inputField.focus();
      results.textContent = "Bad guess! you can attempt " + (3 - strikes) +" more !";
      results.style.color = 'red';
    } 
    else {
      for (i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          secret[i] = letter;
          inputField.value = "";
          inputField.focus();
        }
        dashesAndLetters.textContent = secret.join(" ");
      }
    }
  }
  if (strikes === 3) {
    results.textContent = "Sorry, please play again!";
    results.style.color = 'red';
    setGameOver();
  } else if(word === secret.join("")) {
    results.textContent = "Congratulations on your win!" ;
    winPhrase.textContent = "The secret word was " + word;
    results.style.color = 'green';
    winPhrase.style.color = 'green';
    setGameOver();
  }
}

function setGameOver(){
	inputField.disabled = true;
	submitButton.disabled = true;
	resetButton = document.createElement('button');
	resetButton.textContent = 'Start new game';
  document.querySelector("#buttons-group").appendChild(resetButton);
  resetButton.className = "btn btn-secondary";
	resetButton.addEventListener('click' , resetGame);
  }
  
  function resetGame(){
    strikes = 0;
    const resetParas = document.querySelectorAll('.resultParas p');
  
    for(let i = 0; i < resetParas.length; i++){
      resetParas[i].textContent ='';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    inputField.disabled = false;
    submitButton.disabled = false;
    inputField.value = '';
    inputField.focus();
    
    playerTitle.textContent = intro;
    dashesAndLetters.textContent = '';
    
    firstStart = 1;
    secret = [];
  }	