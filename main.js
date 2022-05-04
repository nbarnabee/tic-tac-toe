document.querySelector(".initialize").addEventListener("click", initializeGame);
const buttonSet = document.querySelectorAll('.game-square');
const buttonArray = Array.from(buttonSet);
let playerSet = [];
let computerSet = [];
const victorySets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

function initializeGame() {
  buttonArray.forEach(element => element.addEventListener("click", setPlayerChoice));
  buttonArray.forEach(element=>{
    if (element.classList.contains("x")) {
      element.classList.remove("x")
    } else if (element.classList.contains("x")) {
      element.classList.remove("o")
    } else return;
  });
  console.log("Initialized");
}

function setPlayerChoice(click) {
  const clicked=click.target;
  if (clicked.classList.contains("x") || clicked.classList.contains("o")) {
    return
  } else { 
    clicked.classList.add("x");
    playerSet.push(+clicked.value);
    console.log(playerSet);
  };

  if (evaluateSet(playerSet) === true) {
    alert("Player wins!");
    buttonArray.forEach(element => element.removeEventListener("click", setPlayerChoice));
    playerSet = [];
    computerSet = [];
  }
  else setComputerChoice();
}

function evaluateSet(set) {
  for (i = 0; i < victorySets.length; i++) {
    if (victorySets[i].every(num => set.includes(num)))
    return true
  }
}

function setComputerChoice() {
  return;
}