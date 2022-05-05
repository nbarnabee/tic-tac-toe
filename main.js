const buttonArray = Array.from(document.querySelectorAll(".game-square"));
const initializeButton = document.querySelector(".initializer")

const ticTacToe = {
  playerSet: [],
  computerSet: [],
  choiceArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  victorySets: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
  playerScore: 0,
  computerScore: 0,
  
  updateScore() {
    document.querySelector(".score-board").textContent = `Player: ${this.playerScore},  Computer: ${this.computerScore}`;
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

  /* Check to see if the player has made a valid choice; if yes, adjust the class list of the grid button to display "X", add the value of the choice to the player array, remove it from the array of possible moves, and check to see if the player just won (maybe this function does too much)  */

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


  /* Search for a valid move, in the following order of preference:
  1. a move which will let the computer win
  2. a move which will prevent the player from winning
  3. a random move  
  when a valid move is found, update the grid, the computer array and the array of possible choices.  there's some duplication between this and setPlayerChoice() that I could probably eliminate with a cleverer function */

 setComputerChoice() {
   let compChoice = ticTacToe.checkForWin(ticTacToe.computerSet);
   if (typeof compChoice != "number")
     compChoice = ticTacToe.checkForWin(ticTacToe.playerSet);
   if (typeof compChoice != "number") {
       let randomNum = Math.floor(Math.random() * ticTacToe.choiceArray.length);
       compChoice = ticTacToe.choiceArray[randomNum];
       }; 
    console.log(compChoice);
    if (this.choiceArray.includes(compChoice)) {
    ticTacToe.computerSet.push(compChoice);
    let compTarget = document.querySelector(`[value = '${compChoice}']`);
    compTarget.classList.add("o");
    ticTacToe.choiceArray.splice(this.choiceArray.indexOf(compChoice), 1);
    ticTacToe.evaluateSet(ticTacToe.computerSet, "Computer");
    }
    else console.error(`Something is wrong.  I wanted to pick ${compChoice}`)
  },


  // Check the sets to see if a winning move is available

  checkForWin(setToCheck) {
    if (this.choiceArray.includes(0) && ((setToCheck.includes(1) && setToCheck.includes(2)) || (setToCheck.includes(4) && setToCheck.includes(8)) || (setToCheck.includes(3) && setToCheck.includes(6))))
     {
       return 0;
      }
    else if (this.choiceArray.includes(1) && ((setToCheck.includes(0) && setToCheck.includes(2)) || (setToCheck.includes(4) && setToCheck.includes(7))))
     {
       return 1;
      }
    else if (this.choiceArray.includes(2) && ((setToCheck.includes(0) && setToCheck.includes(1)) || (setToCheck.includes(5) && setToCheck.includes(8)) || (setToCheck.includes(4) && setToCheck.includes(6))))
     {
       return 2;
      }
    else if (this.choiceArray.includes(3) && ((setToCheck.includes(0) && setToCheck.includes(6)) || (setToCheck.includes(4) && setToCheck.includes(5))))
     {
       return 3;
      }
    else if (this.choiceArray.includes(4) && ((setToCheck.includes(0) && setToCheck.includes(8)) || (setToCheck.includes(2) && setToCheck.includes(6)) || (setToCheck.includes(1) && setToCheck.includes(7)) || (setToCheck.includes(3) && setToCheck.includes(5))))
     {
       return 4;
      }
    else if (this.choiceArray.includes(5) && ((setToCheck.includes(2) && setToCheck.includes(8)) || (setToCheck.includes(3) && setToCheck.includes(4))))
     {
       return 5;
      }
    else if (this.choiceArray.includes(6) && ((setToCheck.includes(0) && setToCheck.includes(3)) || (setToCheck.includes(7) && setToCheck.includes(8)) || (setToCheck.includes(2) && setToCheck.includes(4))))
     {
       return 6;
      }
    else if (this.choiceArray.includes(7) && ((setToCheck.includes(6) && setToCheck.includes(8)) || (setToCheck.includes(1) && setToCheck.includes(4))))
     {
       return 7;
      }
    else if (this.choiceArray.includes(8) && ((setToCheck.includes(2) && setToCheck.includes(5)) || (setToCheck.includes(6) && setToCheck.includes(7)) || (setToCheck.includes(0) && setToCheck.includes(4))))
     {
       return 8;
      }
    else return;
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