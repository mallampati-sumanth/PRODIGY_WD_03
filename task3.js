const selectBox = document.querySelector(".select-box"),
  selectBtnX = selectBox.querySelector(".options .playerX"),
  selectBtnO = selectBox.querySelector(".options .playerO"),
  playBoard = document.querySelector(".play-board"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll("section span"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");

let currentPlayer = "Sumanth"; // Start with Sumanth

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
}

selectBtnX.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.classList.add("active");
  currentPlayer = "Sumanth";
  updateTurnText();
}

selectBtnO.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.classList.add("active");
  currentPlayer = "Opponent";
  updateTurnText();
}

function clickedBox(element) {
  if (element.innerHTML === "") {
    element.innerHTML = currentPlayer === "Sumanth" ? `<i class="fas fa-user"></i>` : `<i class="far fa-user-circle"></i>`;
    element.setAttribute("data-player", currentPlayer);
    element.style.pointerEvents = "none"; // Disable further clicks on this box
    if (checkWin(currentPlayer)) {
      showResult(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
      showResult("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "Sumanth" ? "Opponent" : "Sumanth"; // Switch turns
      updateTurnText();
    }
  }
}

function updateTurnText() {
  const playerTurn = document.querySelector(`.players .${currentPlayer}Turn`);
  const otherPlayer = document.querySelector(`.players .${currentPlayer === "Sumanth" ? "Opponent" : "Sumanth"}Turn`);
  playerTurn.style.color = "#fff";
  otherPlayer.style.color = "#56baed";
  document.querySelector(".header").textContent = `${currentPlayer === "Sumanth" ? "Sumanth's Turn" : "Opponent's Turn"}`;
}

function checkWin(player) {
  const winningCombos = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7] // Diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      document.querySelector(`.box${a}`).getAttribute("data-player") === player &&
      document.querySelector(`.box${b}`).getAttribute("data-player") === player &&
      document.querySelector(`.box${c}`).getAttribute("data-player") === player
    );
  });
}

function checkDraw() {
  return [...allBox].every(box => box.innerHTML !== "");
}

function showResult(message) {
  wonText.textContent = message;
  resultBox.classList.add("show");
  playBoard.classList.remove("show");
}

replayBtn.onclick = () => {
  window.location.reload();
}
