document.querySelector(".initialize").addEventListener("click", initializeGame);
const buttonSet = document.querySelectorAll('.game-square');
const buttonArray = Array.from(buttonSet);
let playerSet = [];
let computerSet = [];
let choiceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const victorySets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]


// Reset the game board and set eventListeners

function initializeGame() {
  buttonArray.forEach(element => element.addEventListener("click", setPlayerChoice));
  buttonArray.forEach(element=>{
    if (element.classList.contains("x")) {
      element.classList.remove("x")
    } else if (element.classList.contains("o")) {
      element.classList.remove("o")
    } else return;
  });
  console.log("Initialized");
}

// Check to see if the player has made a valid choice; if yes, do various things, check for a win condition, and trigger the computer choice (this function probably does too much)

function setPlayerChoice(click) {
  const clicked=click.target;
  let chosen = choiceArray.indexOf(+clicked.value);
  if (choiceArray.includes(+clicked.value)) {
    clicked.classList.add("x");
    playerSet.push(+clicked.value);
    choiceArray.splice(chosen, 1);
    console.log(`Choice array: ${choiceArray}`);
    console.log(`Player set: ${playerSet}`);
    evaluateSet(playerSet, Player);
  }
  else return;
}

// Computer picks randomly from the possible choices (In the future, I would like to stick some basic logic in here to let the computer make more informed decisions)

function setComputerChoice() {
  let compChoice = Math.floor(Math.random() * 9);
  if (choiceArray.includes(compChoice)) {
    computerSet.push(compChoice);
    console.log(`Computer set : ${computerSet}`);
    let compTarget = document.querySelector(`[value = '${compChoice}']`);
    compTarget.classList.add("o");
    let choiceIndex = choiceArray.indexOf(compChoice);
    choiceArray.splice(choiceIndex, 1);
    console.log(`Choice array: ${choiceArray}`);
    evaluateSet(computerSet, Computer);
  }
  else setComputerChoice();
}

// Check for a win condition 

function evaluateSet(set, player) {
  for (i = 0; i < victorySets.length; i++) {
    if (victorySets[i].every(num => set.includes(num)))
    alert(`The ${player} wins!`);
    return true;
  }
  if (choiceArray.length === 0) {
    alert("Tie game!");
    gameIdle();
  }
  else return;
}

// Prepare the game for restart

function gameIdle() {
  buttonArray.forEach(element => element.removeEventListener("click", setPlayerChoice));
  playerSet = [];
  computerSet = [];
  choiceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}