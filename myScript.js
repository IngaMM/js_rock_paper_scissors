const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

/*Global variables*/
let computerCount = 0;
let playerCount = 0;
let roundCount = 0;

/*Introduce parameter Selection that can be addressed within function called by
querySelector*/
rock.Selection = "rock";
paper.Selection = "paper";
scissors.Selection = "scissors";

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", playStart);
});

function playStart(evt) {
  if (roundCount == 5) {
    roundCount = 0;
    playerCount = 0;
    computerCount = 0;
    removeElementsByClass("winner");
  }
  let computerSelection = computerPlay();
  let playerSelection = evt.target.Selection;
  let winner = playRound(playerSelection, computerSelection);
  displayResults(computerSelection, playerSelection, winner);
  displayScore();
  playEnd();
}

function computerPlay() {
  let rand = Math.random();
  if (rand < 1 / 3) {
    compGuess = "rock";
  } else if (rand < 2 / 3) {
    compGuess = "paper";
  } else {
    compGuess = "scissors";
  }
  return compGuess;
}

function playRound(playerSelection, computerSelection) {
  let winner;
  if (computerSelection == "rock") {
    switch (playerSelection) {
      case "paper":
        winner = "player";
        playerCount += 1;
        roundCount += 1;
        break;
      case "scissors":
        winner = "computer";
        computerCount += 1;
        roundCount += 1;
        break;
      case "rock":
        winner = "draw";
        roundCount += 1;
        break;
      default:
        winner = "invalid";
        break;
    }
  } else if (computerSelection == "scissors") {
    switch (playerSelection) {
      case "paper":
        winner = "computer";
        computerCount += 1;
        roundCount += 1;
        break;
      case "rock":
        winner = "player";
        playerCount += 1;
        roundCount += 1;
        break;
      case "scissors":
        winner = "draw";
        roundCount += 1;
        break;
      default:
        winner = "invalid";
        break;
    }
  } else if (computerSelection == "paper") {
    switch (playerSelection) {
      case "scissors":
        winner = "player";
        playerCount += 1;
        roundCount += 1;
        break;
      case "rock":
        winner = "computer";
        computerCount += 1;
        roundCount += 1;
        break;
      case "paper":
        winner = "draw";
        roundCount += 1;
        break;
      default:
        winner = "invalid";
        break;
    }
  }
  return winner;
}

function displayResults(computerSelection, playerSelection, winner) {
  removeElementsByClass("announcement");

  const resultSection = document.querySelector("#resultSection");
  const announcement = document.createElement("div");
  announcement.classList.add("announcement");
  if (winner == "computer") {
    announcement.textContent =
      "You loose this round! The computer selected " +
      computerSelection +
      " and you selected " +
      playerSelection +
      "!";
    announcement.style.color = "red";
  } else if (winner == "player") {
    announcement.textContent =
      "You win this round! You selected " +
      playerSelection +
      " and the computer selected " +
      computerSelection +
      "!";
    announcement.style.color = "green";
  } else if (winner == "draw") {
    announcement.textContent =
      "No one wins this round! You both selected " + playerSelection + "!";
    announcement.style.color = "blue";
  } else {
    announcement.textContent =
      "Invalid round! The computer selected " +
      computerSelection +
      " and you selected " +
      playerSelection +
      "!";
  }
  resultSection.appendChild(announcement);
}

function displayScore() {
  removeElementsByClass("score");

  const playerScore = document.querySelector("#playerScore");
  const computerScore = document.querySelector("#computerScore");

  const playerScoreContent = document.createElement("div");
  const computerScoreContent = document.createElement("div");

  playerScoreContent.classList.add("score");
  computerScoreContent.classList.add("score");

  computerScoreContent.textContent = computerCount;
  playerScoreContent.textContent = playerCount;

  playerScore.appendChild(playerScoreContent);
  computerScore.appendChild(computerScoreContent);
}

function playEnd() {
  if (roundCount == 5) {
    const winnerSection = document.querySelector("#winnerSection");
    const winnerSectionContent = document.createElement("div");
    winnerSectionContent.classList.add("winner");
    if (playerCount > computerCount) {
      winnerSectionContent.textContent = "You are the winner of the game!";
    } else if (computerCount > playerCount) {
      winnerSectionContent.textContent =
        "The computer is the winner of the game!";
    } else {
      winnerSectionContent.textContent =
        "No one wins the game. You have both the same score.";
    }
    winnerSection.appendChild(winnerSectionContent);
    return;
  } else {
    return;
  }
}

function removeElementsByClass(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
