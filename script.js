let board;
let rows = 4;
let columns = 4;
let num = 0;
let score = 0;
let best = 0;

let newGame = document.getElementById("new-game");
let gameScore = document.getElementById("score");
let gameBoard = document.getElementById("board");
let highScore = document.getElementById("best");

window.onload = () => {
  startGame();
  best = localStorage.getItem("highScore");
  highScore.innerText = best;
}

newGame.addEventListener("click", function(){
    window.location.reload();
})

function startGame() {
 board = [
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]
 ]
  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "_" + c.toString();
      num = board[r][c];
      updateTile(tile, num);
      gameBoard.appendChild(tile);
    }
  }
  placeTwo();
  placeTwo();
}


function updateTile(tile, num) {
  tile.innerText = 0;
  tile.classList = "";
  tile.classList.add("tile");
  if(num === 0) {
    tile.innerText = "";
  }
  if(num > 0) {
    if(num <= 4096) {
      tile.classList.add("x" + num.toString());
      tile.innerText = num;
    }else {
      tile.classList.add("x8192")
      tile.innerText = num;
    }
  }
}

function hasEmptyTile() {
  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < columns; c++) {
      if(board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function placeTwo() {
  if(!hasEmptyTile()) {
    return;
  }
  let found = false;
  while(!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if(board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "_" + c.toString());
      tile.innerText = 2;
      tile.classList.add("x2");
      found = true;
    }
  }
}

document.addEventListener("keyup", function(e) {
    if(e.code === "ArrowLeft") {
    slideLeft();
    setScores();
    placeTwo();
  }else if(e.code === "ArrowRight") {
    slideRight();
    setScores();
    placeTwo();
  }else if(e.code === "ArrowUp") {
    slideUp();
    setScores();
    placeTwo();
  }else if(e.code === "ArrowDown") {
    slideDown();
    setScores();
    placeTwo();
  }
});

//set hthe scores.
function setScores() {
    gameScore.innerText = score;
    if(score > best) {
        highScore.innerText = score;
        localStorage.setItem("highScore", score);
    }
}

//filtering zeros in array
function filteredZeros(row) {
  return row.filter(num => num != 0);
}

//updating rows/columns after sliding
function slide(row) {
  row = filteredZeros(row);
  for(let i = 0; i < row.length; i++) {
    if(row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  row = filteredZeros(row);
  
  while(row.length < columns) {
    row.push(0);
  }
  return row;
}


//sliding functions
function slideLeft() {
  for(let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for(let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "_" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }
}


function slideRight() {
  for(let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;
    for(let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "_" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }  
}

function slideUp() {
  for(let c = 0; c < columns; c++) {
    let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
    col = slide(col);
    for(let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "_" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for(let c = 0; c < columns; c++) {
    let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
    col.reverse();
    col = slide(col);
    col.reverse();
    for(let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "_" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }
}