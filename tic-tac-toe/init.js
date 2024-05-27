// Variables
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const playerXScoreElement = document.getElementById("playerXScore");
const playerOScoreElement = document.getElementById("playerOScore");
const humanScoreElement = document.getElementById("humanScore");
const computerScoreElement = document.getElementById("computerScore");

let humanVsHumanMode = true; // Default mode is Human vs Human
let currentPlayer = "X";
let playerXScore = 0;
let playerOScore = 0;
let humanScore = 0;
let computerScore = 0;

// Initialize game
startGame();

// Function to start/restart the game
function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  restartButton.addEventListener("click", startGame);
  board.classList.remove("disabled");
}

// Function to handle cell click
function handleClick(event) {
  const cell = event.target;
  const currentClass = currentPlayer === "X" ? "x" : "o";
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
    if (!humanVsHumanMode && currentPlayer === "O") {
      // If playing against computer, make computer move
      computerMove();
    }
  }
}

// Function to place X or O mark in the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Function to switch players
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check for a win
function checkWin(currentClass) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Function to check for a draw
function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

// Function to end the game
function endGame(draw) {
  board.classList.add("disabled");
  if (draw) {
    // Update scores for draw
    if (humanVsHumanMode) {
      // If in Human vs Human mode
      playerXScore++;
      playerOScore++;
      playerXScoreElement.textContent = playerXScore;
      playerOScoreElement.textContent = playerOScore;
    } else {
      // If in Human vs Computer mode
      humanScore++;
      computerScore++;
      humanScoreElement.textContent = humanScore;
      computerScoreElement.textContent = computerScore;
    }
  } else {
    // Update scores for win
    if (humanVsHumanMode) {
      // If in Human vs Human mode
      currentPlayer === "X" ? playerXScore++ : playerOScore++;
      playerXScoreElement.textContent = playerXScore;
      playerOScoreElement.textContent = playerOScore;
    } else {
      // If in Human vs Computer mode
      currentPlayer === "X" ? humanScore++ : computerScore++;
      humanScoreElement.textContent = humanScore;
      computerScoreElement.textContent = computerScore;
    }
  }
  // Show game completed modal
  $("#gameCompletedModal").modal("show");
}

// Function for computer move
function computerMove() {
  const emptyCells = [...cells].filter((cell) => {
    return !cell.classList.contains("x") && !cell.classList.contains("o");
  });
  const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomCellIndex];
  setTimeout(() => {
    placeMark(cell, "o");
    if (checkWin("o")) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      switchPlayer();
    }
  }, 1000); // Delay computer move by 1 second for better visualization
}

// Event listener for game mode buttons
document.getElementById("humanVsHuman").addEventListener("click", () => {
  humanVsHumanMode = true;
  startGame();
});

document.getElementById("humanVsComputer").addEventListener("click", () => {
  humanVsHumanMode = false;
  startGame();
});
// Event listener for closing the modal and refreshing the page
document
  .getElementById("closeModalButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default action of the close button
    $("#gameCompletedModal").modal("hide"); // Hide the modal
    location.reload(); // Reload the page
  });
