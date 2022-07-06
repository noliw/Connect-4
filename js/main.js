/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'red',
    '-1': 'yellow'
  };

/*----- app's state (variables) -----*/
let board;//0: empty slots, plyr1 or plyr2 for players
let gameStatus; // 0: game in play, 1 or -1: winner; T for tie
let turn; // plyr1 or plyr2

/*----- cached element references -----*/
const markerDiv = [...document.querySelectorAll('#markers > div')];//creates an array and spreads it out;

/*----- event listeners -----*/
// document.querySelectorAll('.board').addEventListener('click', handleClick)
document.getElementById('board').addEventListener('mouseover', handleMouseOver)
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
function render() {
    // itterate through the outter array (columns)
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
          const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
          cellEl.style.backgroundColor = COLORS[cellVal];
        });
      });
      renderMarkers();
    }

// hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
    markerDiv.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
  }
// Update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerDiv.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    render();
  }

function handleMouseOver(evt){
const cellDiv = evt.target
}
