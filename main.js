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

// Iteration 2
class Character {
  constructor(col, row, direction) {
    this.col = col;
    this.row = row;
    this.direction = direction;
  }
  moveUp() {
    this.col--;
  }
  moveRight() {
    this.row++;
  }
  moveDown() {
    this.col++;
  }
  moveLeft() {
    this.row--;
  }
}

const player = new Character(0, 0); // (0,0) = Initial position
player.moveDown(); // Increase by 1 the value of player.row
player.moveDown(); // Increase by 1 the value of player.row
player.moveRight(); // Increase by 1 the value of player.col

// Iteration 3
function drawPlayer() {
  const playerImg = new Image();
  playerImg.src = './images/character-down.png';
  playerImg.addEventListener('load', () => {
    context.drawImage(
      playerImg,
      player.row * SQUARE_WIDTH,
      player.col * SQUARE_HEIGHT,
      SQUARE_WIDTH,
      SQUARE_HEIGHT
    );
  });
}

// Iteration 4
class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * (10 - 0));
    this.row = Math.floor(Math.random() * (10 - 0));
  }
}

const treasure = new Treasure();
treasure.setRandomPosition();

function drawTreasure() {
  const treasureImg = new Image();
  treasureImg.src = './images/treasure.png';
  treasureImg.addEventListener('load', () => {
    context.drawImage(
      treasureImg,
      treasure.col * SQUARE_WIDTH,
      treasure.row * SQUARE_HEIGHT,
      SQUARE_WIDTH,
      SQUARE_HEIGHT
    );
  });
}

window.addEventListener('keydown', event => {
  event.key;
  console.log('event.key: ', event.key);
  switch (event.key) {
    case 'ArrowUp':
      player.moveUp();
      drawEverything();
      break;
    case 'ArrowDown':
      player.moveDown();
      drawEverything();
      break;
    case 'ArrowLeft':
      player.moveLeft();
      drawEverything();
      break;
    case 'ArrowRight':
      player.moveRight();
      drawEverything();
      break;
    default:
      break;
  }
});

function drawEverything() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();
