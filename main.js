// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const SQUARE_HEIGHT = width / 10;
const SQUARE_WIDTH = width / 10;

// Iteration 1
function drawGrid() {
  context.strokeStyle = 'black';
  context.fillStyle = 'white';
  context.lineWidth = 2;

  for (let col = 0; col < 10; col++) {
    for (let row = 0; row < 10; row++) {
      context.strokeRect(
        SQUARE_WIDTH * col,
        SQUARE_HEIGHT * row,
        SQUARE_HEIGHT,
        SQUARE_WIDTH
      );
    }
  }
}

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.row--;
  }
  moveRight() {
    this.col++;
  }
  moveDown() {
    this.row++;
  }
  move() {
    this.col--;
  }
}

const player = new Character(0, 0); // (0,0) = Initial position
console.log('player: ', player);
player.moveDown(); // Increase by 1 the value of player.row
player.moveDown(); // Increase by 1 the value of player.row
player.moveRight(); // Increase by 1 the value of player.col
console.log(player.col, player.row);

function drawEverything() {
  drawGrid();
  // drawPlayer()
  // drawTreasure()
}

drawEverything();
