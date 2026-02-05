const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let won = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.textContent = `Player ${currentPlayer} Wins 🎉`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "";
}