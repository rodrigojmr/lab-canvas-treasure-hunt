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
  constructor(name, col, row, direction) {
    this.name = name;
    this.col = col;
    this.row = row;
    this.direction = direction;
    this.score = 0;
  }
  moveUp() {
    this.direction = 'up';
    if (this.row === 0) return false;
    this.row--;
  }
  moveRight() {
    this.direction = 'right';
    if (this.col === 9) return false;
    this.col++;
  }
  moveDown() {
    this.direction = 'down';
    if (this.row === 9) return false;
    this.row++;
  }
  moveLeft() {
    this.direction = 'left';
    if (this.col === 0) return false;
    this.col--;
  }
}

const player1 = new Character('Player 1', 2, 5, 'down'); // (0,0) = Initial position
const player2 = new Character('Player 2', 7, 4, 'left');
const players = [player1, player2];

// Iteration 3
function drawPlayer() {
  for (const player of players) {
    const playerImg = new Image();
    if (player.direction === 'up') {
      playerImg.src = './images/character-up.png';
    } else if (player.direction === 'down') {
      playerImg.src = './images/character-down.png';
    } else if (player.direction === 'left') {
      playerImg.src = './images/character-left.png';
    } else if (player.direction === 'right') {
      playerImg.src = './images/character-right.png';
    }
    playerImg.addEventListener('load', () => {
      context.drawImage(
        playerImg,
        player.col * SQUARE_WIDTH,
        player.row * SQUARE_HEIGHT,
        SQUARE_WIDTH,
        SQUARE_HEIGHT
      );
    });
  }
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
    if (
      (player1.col === treasure.col && player1.row === treasure.row) ||
      (player2.col === treasure.col && player2.row === treasure.row)
    ) {
      this.setRandomPosition();
    }
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

function drawScores() {
  setTimeout(() => {
    context.font = '20px Arial';
    context.fillStyle = 'blue';
    context.fillText(
      player1.score,
      player1.col * SQUARE_WIDTH + SQUARE_WIDTH / 2 - 5,
      player1.row * SQUARE_HEIGHT - 10,
      50
    );
    context.fillStyle = 'red';
    context.fillText(
      player2.score,
      player2.col * SQUARE_WIDTH + SQUARE_WIDTH / 2 - 5,
      player2.row * SQUARE_HEIGHT - 10,
      50
    );
  }, 50);
}

function treasureCheck(player) {
  if (player.col === treasure.col && player.row === treasure.row) {
    player.score++;
    drawScores();
    treasure.setRandomPosition();
  }
}

window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      player1.moveUp();
      treasureCheck(player1);
      drawEverything();
      break;
    case 'ArrowDown':
      player1.moveDown();
      treasureCheck(player1);
      drawEverything();
      break;
    case 'ArrowLeft':
      player1.moveLeft();
      treasureCheck(player1);
      drawEverything();
      break;
    case 'ArrowRight':
      player1.moveRight();
      treasureCheck(player1);
      drawEverything();
      break;
    case 'w':
      player2.moveUp();
      treasureCheck(player2);
      drawEverything();
      break;
    case 's':
      player2.moveDown();
      treasureCheck(player2);
      drawEverything();
      break;
    case 'a':
      player2.moveLeft();
      treasureCheck(player2);
      drawEverything();
      break;
    case 'd':
      player2.moveRight();
      treasureCheck(player2);
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
