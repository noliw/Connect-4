/*----- constants -----*/
const COLORS = {
  0: "white",
  1: "red",
  "-1": "yellow",
};

/*----- app's state (constiables) -----*/
let board; //0: empty slots, plyr1 or plyr2 for players
let turn; // plyr1 or plyr2
let isGameOver;

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll("#markers > div")]; //creates an array and spreads it out;

/*----- event listeners -----*/
// document.querySelectorAll('.board').addEventListener('click', handleClick)
document.getElementById("markers").addEventListener("click", handleDrop);
document.getElementById("playAgain").addEventListener("click", playAgain);
const message = document.getElementById("message");
/*----- functions -----*/
init();

function init() {
  // create a new empty array and fill sets it to 0
  board = [
    // [col 0, row 3]
    [0, 0, 0, 0, 0, 0], // col0
    [0, 0, 0, 0, 0, 0], // col1
    [0, 0, 0, 0, 0, 0], // col2
    [0, 0, 0, 0, 0, 0], // col3
    [0, 0, 0, 0, 0, 0], // col4
    [0, 0, 0, 0, 0, 0], // col5
    [0, 0, 0, 0, 0, 0], // col6
  ];
  // game inplay
  // gameStatus = 0;
  // plyr 1 turn
  turn = 1;
  isGameOver = false;
  render();
}

function playAgain() {
  init();
  message.innerText = "";
}

// render shows the output in the browser
// its job is to transfer/visualize all state to the Dom
let cols = board.length,
  rows = board[0].length;
function render() {
  // itterate through the outter array (columns)
  board.forEach(function (colArr, colIdx) {
    colArr.forEach(function (cellVal, rowIdx) {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
  renderMarkers();
}

// hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
  markerEls.forEach(function (markerEl, colIdx) {
    markerEl.style.visibility = board[colIdx].includes(0)
      ? "visible"
      : "hidden";
  });
}

// update all impacted state then call render()
function handleDrop(event) {
  if (isGameOver) {
    return;
  }

  const colIdx = markerEls.indexOf(event.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;

  // checkWin returns winning player or null
  const winner = checkWin(colIdx, rowIdx);

  if (winner === 1 || winner === -1) {
    // we have winning player
    isGameOver = true;

    message.innerText = `Player ${winner === 1 ? "One" : "Two"} has won!`;
  } else {
    // no winnder, check draw

    if (checkDraw()) {
      isGameOver = true;
      message.innerText = "There is a draw!";
    }
  }

  turn = turn * -1;
  render();
}

// checkWin returns the winning player index or null if there is no winner
function checkWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];

  return (
    checkVertWin(colIdx, rowIdx, player) ||
    checkHorizWin(colIdx, rowIdx, player) ||
    checkDiagonalRight(colIdx, rowIdx, player) ||
    checkDiagonalLeft(colIdx, rowIdx, player)
  );
}

function checkVertWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  // We can use/modify rowIdx because we won't need
  // to access it's original value anymore
  rowIdx--;
  // Count until no longer the same 'player'
  while (colArr[rowIdx] === player && rowIdx >= 0) {
    count++;
    rowIdx--;
  }
  return count === 4 ? player : null;
}

function checkHorizWin(colIdx, rowIdx, player) {
  let idx = colIdx + 1;
  let count = 1;

  // check if player won from left to right
  // Count until no longer the same 'player'
  while (idx < board.length && board[idx][rowIdx] === player) {
    count++;
    idx++;
  }

  if (count === 4) {
    return player;
  }

  // check if player won from right to left
  idx = colIdx - 1;
  while (idx >= 0 && board[idx][rowIdx] === player) {
    count++;
    idx--;
  }

  if (count === 4) {
    return player;
  }

  return null;
}

function checkDiagonalRight(colIdx, rowIdx, player) {
  let count = 1;

  let colCounter = colIdx + 1;
  let rowCounter = rowIdx - 1;

  while (
    colCounter < cols &&
    rowCounter >= 0 &&
    board[colCounter][rowCounter] === player
  ) {
    colCounter++;
    rowCounter--;
    count++;
  }

  if (count === 4) {
    return player;
  }

  return null;
}

function checkDiagonalLeft(colIdx, rowIdx, player) {
  let count = 1;

  let colCounter = colIdx - 1;
  let rowCounter = rowIdx - 1;

  while (
    colCounter >= 0 &&
    rowCounter >= 0 &&
    board[colCounter][rowCounter] === player
  ) {
    colCounter--;
    rowCounter--;
    count++;
  }

  if (count === 4) {
    return player;
  }

  return null;
}

function checkDraw() {
  // if we find one row that has an empty cell, game is not finished, some player can still make a move...
  // else, if all the cells are occuppied by some player, and all the other checks fails, then we can consider it a draw, "every cell is filled in before we found the winner"

  return !board.some(function (cols) {
    return cols.some((row) => row === 0);
  });
}
