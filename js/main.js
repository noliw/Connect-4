/*----- constants -----*/
const COLOR =  {
 '0': 'white',
 '1': 'red',
 '-1': 'yellow',
};

/*----- app's state (variables) -----*/
let board;//0: empty slots, plyr1 or plyr2 for players
let gameStatus; // 0: game in play, 1 or -1: winner; T for tie
let turn; // plyr1 or plyr2

/*----- cached element references -----*/
const cell = [...document.querySelectorAll('.board > div')]; // create array with all the cells

/*----- event listeners -----*/
// document.querySelectorAll('.board').addEventListener('click', handleClick)
document.getElementById('board').addEventListener('mouseover', handleMouseOver)
/*----- functions -----*/
init();



function init() {
    // create a new empty array and fill sets it to 0
    board = [
        [1, 0, 0, 0, 0, 0], // col0
        [0, 0, 0, 0, 0, 0], // col1
        [0, 0, 0, 0, 0, 0], // col2
        [0, 0, 0, 0, 0, 0], // col3
        [0, 0, 0, 0, 0, 0], // col4
        [0, 0, 0, 0, 0, 0], // col5
        [0, 0, 0, 0, 0, -1] // col6
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
    board.forEach(function (columnArr, columnIdx) {
        // itterate through the inner array (row)
        columnArr.forEach(function(cell, rowIdx) {
            const cellDiv = document.getElementById(`row-${rowIdx}-col-${columnIdx}`) 
            cellDiv.style.backgroundColor = COLOR[cell];
            cellDiv
        });
    });
}

function handleMouseOver(evt){
const cellDiv = evt.target
}

// in response to user interaction (click)
// we update ALL impacted state
// function handleClick (evt) {
// // guards if someone clicks out of bounds

// }