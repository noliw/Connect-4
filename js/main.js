/*----- constants -----*/
const COLORS = {
  '0': 'white',
  '1': 'red',
  '-1': 'yellow'
};

/*----- app's state (constiables) -----*/
let board;//0: empty slots, plyr1 or plyr2 for players
let gameStatus; // 0: game in play, 1 or -1: winner; T for tie
let turn; // plyr1 or plyr2

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];//creates an array and spreads it out;

/*----- event listeners -----*/
// document.querySelectorAll('.board').addEventListener('click', handleClick)
document.getElementById('markers').addEventListener('click', handleDrop);
/*----- functions -----*/
init();



function init() {
  // create a new empty array and fill sets it to 0
  board = [
    [0, 0, 0, 0, 0, 0], // col0
    [0, 0, 0, 0, 0, 0], // col1
    [0, 0, 0, 0, 0, 0], // col2
    [0, 0, 0, 0, 0, 0], // col3
    [0, 0, 0, 0, 0, 0], // col4
    [0, 0, 0, 0, 0, 0], // col5
    [0, 0, 0, 0, 0, 0] // col6
  ];
  // game inplay
  // gameStatus = 0;
  // plyr 1 turn
  turn = 1;
  render();
}


// render shows the output in the browser 
// its job is to transfer/visualize all state to the Dom
let cols = board.length, rows = board[0].length;
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
    markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
  });
}
// Update all impacted state, then call render
function handleDrop(evt) {
  const colIdx = markerEls.indexOf(evt.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  turn *= -1;
  winner = getWinner(colIdx, rowIdx);
  render();
}



/*-- BEGIN: New Approach based upon most recent click --*/
/**
 * It checks for a vertical win or a horizontal win.
 * @param colIdx - the column index of the last move
 * @param rowIdx - the row index of the last move
 */
function getWin(colIdx, rowIdx) {
  let winner = checkVertWin(colIdx) || checkHorWin(colIdx, rowIdx);
}

function checkHorWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  // Move colIdx to left most col that = player
  while (colIdx - 1 >= 0 && board[colIdx - 1][rowIdx] === player) colIdx--;
  if (colIdx > 3) return null;
  const sum = board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx] + board[colIdx + 3][rowIdx];
  return (Math.abs(sum) === 4) ? board[colIdx][rowIdx] : null;
}

function checkVertWin(colIdx, rowIdx) {
  /* checking if the row index of the most recent click is less than 3. If it is, then there's no
  way that there can be a vertical win, so it returns null. */
  if (rowIdx < 3) return null;
  /* creating a variable called colArr and setting it equal to the column array at the index of
  the column that was clicked. */
  const colArr = board[colIdx];
  /*  adding the values of the four cells in a column. */
  const sum = colArr[rowIdx] + colArr[rowIdx - 1] + colArr[rowIdx - 2] + colArr[rowIdx - 3];
  /*  checking if the sum of the values of the four cells in a column is 4. If it is, then the
  value of the first cell is returned. Otherwise, null is returned. */
  return (Math.abs(sum) === 4) ? colArr[rowIdx] : null;
}

/*-- END: New approach based upon most recent click --*/
/**
 * We loop through the board array, and for each column array, we check if there's a winner in that
 * column
 * @returns The winner of the game.
 */
function getWinner() {
  let winner;
  board.some((colArr, colIdx) => {
    winner = checkCol(colArr, colIdx);
    return winner;
  });
  return winner;
}

/**
 * If the cell is empty, break out of the some method. Otherwise, check if there's a winner in the up,
 * right, diagonal up-right, or diagonal up-left directions
 * @param colArr - the array of cells in the column
 * @param colIdx - the column index of the cell that was just clicked
 * @returns the winner of the game.
 */
function checkCol(colArr, colIdx) {
  let winner = 0;
  colArr.some((cell, pos) => {
    if (!cell) return true;  // break out of some method
    winner =
      ((pos <= rows - 4) && up(colArr, pos)) ||
      ((colIdx <= cols - 4) && right(colIdx, pos)) ||
      ((pos <= rows - 4 && colIdx <= cols - 4) && diag(colIdx, pos, 1)) ||
      ((pos >= 3 && colIdx <= cols - 4) && diag(colIdx, pos, -1));
    return winner;
  });
  return (winner === false) ? 0 : winner;
}

/**
 * If the sum of the values of the four cells in a diagonal is 4, then the value of the first cell is
 * returned. Otherwise, 0 is returned
 * @param colIdx - the column index of the first piece in the diagonal
 * @param pos - the row index of the first piece in the diagonal
 * @param vertOffset - 1 for a diagonal going down, -1 for a diagonal going up
 * @returns the value of the first element in the diagonal.
 */
function diag(colIdx, pos, vertOffset) {
  return (Math.abs(board[colIdx][pos] + board[colIdx + 1][pos + vertOffset] + board[colIdx + 2][pos + (vertOffset * 2)] + board[colIdx + 3][pos + (vertOffset * 3)]) === 4) ? board[colIdx][pos] : 0;
}

/**
 * If the sum of the four values in the column is 4, return the value of the first position, otherwise
 * return 0
 * @param colIdx - the column index of the first of the four numbers
 * @param pos - the row index
 * @returns the value of the first element in the array if the sum of the four elements in the array is
 * equal to 4.
 */
function right(colIdx, pos) {
  return (Math.abs(board[colIdx][pos] + board[colIdx + 1][pos] + board[colIdx + 2][pos] + board[colIdx + 3][pos]) === 4) ? board[colIdx][pos] : 0;
}

/**
 * If the sum of the four values in the array is 4, return the first value in the array, otherwise
 * return 0
 * @param colArr - the array of the column we're checking
 * @param pos - the position of the first element in the column
 * @returns the value of the first element in the array if the sum of the first four elements is 4.
 */
function up(colArr, pos) {
  return (Math.abs(colArr[pos] + colArr[pos + 1] + colArr[pos + 2] + colArr[pos + 3]) === 4) ? colArr[pos] : 0;
}