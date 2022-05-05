const buttonArray = Array.from(document.querySelectorAll(".game-square"));
const initializeButton = document.querySelector(".initializer")

const ticTacToe = {
  playerSet: [],
  computerSet: [],
  choiceArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  victorySets: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
  playerScore: 0,
  computerScore: 0,
  scoreBoard: document.querySelector(".score-board"),

  updateScore() {
    ticTacToe.scoreBoard.textContent = `Player: ${ticTacToe.playerScore},  Computer: ${ticTacToe.computerScore}`;
  },

  initializeGame() {
    ticTacToe.initializer("off");
    document.querySelector("h2").textContent = "";
    buttonArray.forEach(element => element.classList.add("ready"));
    buttonArray.forEach(element => element.addEventListener("click", ticTacToe.setPlayerChoice));
    buttonArray.forEach(element=>{
      if (element.classList.contains("x")) {
        element.classList.remove("x")
      } 
      if (element.classList.contains("o")) {
        element.classList.remove("o")
      }
    });
  },

  initializer(toStatus) {
    if (toStatus === "off") {
      initializeButton.classList.replace("light-button", "dark-button");
      initializeButton.removeEventListener("click", ticTacToe.initializeGame);
      initializeButton.textContent = "Good luck";
    }
    else if (toStatus === "on") {
      initializeButton.classList.replace("dark-button", "light-button");
      initializeButton.addEventListener("click", ticTacToe.initializeGame);
      initializeButton.textContent = "Begin Game";
    }
  },

  // Check to see if the player has made a valid choice; if yes, do various things, check for a win condition, and trigger the computer choice (this function probably does too much)

  setPlayerChoice(click) {
    const clicked=click.target;
    let chosen = ticTacToe.choiceArray.indexOf(+clicked.value);
    if (ticTacToe.choiceArray.includes(+clicked.value)) {
      clicked.classList.add("x");
      ticTacToe.playerSet.push(+clicked.value);
      ticTacToe.choiceArray.splice(chosen, 1);
      ticTacToe.evaluateSet(ticTacToe.playerSet, "Player");
    }
    else return;
  },

  // Computer picks randomly from the values present in choiceArray (In the future, I would like to stick some basic logic in here to let the computer make more informed decisions)

 setComputerChoice() {
   let compChoice;
   ticTacToe.playerSet.sort((a, b) => a - b);
   if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 12 || +this.playerSet.join("") == 48 || +this.playerSet.join("") == 36) && !this.computerSet.includes(0))
     compChoice = 0;
    else if (ticTacToe.playerSet.length == 2 && (+this.playerSet.join("") == 2 || +this.playerSet.join("") == 47) && !this.computerSet.includes(1))
     compChoice = 1;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 1 || +this.playerSet.join("") == 58 || +this.playerSet.join("") == 46) && !this.computerSet.includes(2))
     compChoice = 2;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 6 || +this.playerSet.join("") == 45) && !this.computerSet.includes(3))
     compChoice = 3;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 8 || +this.playerSet.join("") == 26 || +this.playerSet.join("") == 17 || +this.playerSet.join("") == 35) && !this.computerSet.includes(4))
     compChoice = 4;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 28 || +this.playerSet.join("") == 34) && !this.computerSet.includes(5))
     compChoice = 5;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 3 || +this.playerSet.join("") == 78) && !this.computerSet.includes(6))
     compChoice = 6;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 68 || +this.playerSet.join("") == 14) && !this.computerSet.includes(7))
     compChoice = 7;
    else if (ticTacToe.playerSet.length === 2 && (+this.playerSet.join("") == 25 || +this.playerSet.join("") == 67 || +this.playerSet.join("") == 4) && !this.computerSet.includes(8))
     compChoice = 8;
   else {
    let randomNum = Math.floor(Math.random() * ticTacToe.choiceArray.length);
    compChoice = ticTacToe.choiceArray[randomNum];
   }
    ticTacToe.computerSet.push(compChoice);
    let compTarget = document.querySelector(`[value = '${compChoice}']`);
    compTarget.classList.add("o");
    ticTacToe.choiceArray.splice(this.choiceArray.indexOf(compChoice), 1);
    ticTacToe.evaluateSet(ticTacToe.computerSet, "Computer");
  },


  // Check for a win condition 

  evaluateSet(set, player) {
    for (i = 0; i < ticTacToe.victorySets.length; i++) {
      if (ticTacToe.victorySets[i].every(num => set.includes(num))) {
        document.querySelector("h2").textContent = `${player} wins!`;
        if (player === "Player") {
          ticTacToe.playerScore += 1;
        } else ticTacToe.computerScore += 1;
        ticTacToe.updateScore();
        ticTacToe.gameIdle();
        return;
      }
    }
    if (ticTacToe.choiceArray.length === 0) {
      document.querySelector("h2").textContent = "Tie game!";
      ticTacToe.gameIdle();
      return;
    }
    if (player === "Player") {
      ticTacToe.setComputerChoice();
    }
    return;
  },

  // Prepare the game for restart

  gameIdle() {
    buttonArray.forEach(element => element.removeEventListener("click", ticTacToe.setPlayerChoice));
    buttonArray.forEach(element => element.classList.remove("ready"));
    ticTacToe.playerSet = [];
    ticTacToe.computerSet = [];
    ticTacToe.choiceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    ticTacToe.initializer("on");
  }
}

initializeButton.addEventListener("click", ticTacToe.initializeGame);
ticTacToe.updateScore();