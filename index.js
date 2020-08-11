const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

const box = 30;

let snake = [];
snake[0] = { x: 9 * box, y: 9 * box };

const createFood = () => {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
  };
};

let food = createFood();

let d = "RIGHT";

const direction = (event) => {
  const key = event.keyCode;

  if (key === 37 && d !== "RIGHT") {
    d = "LEFT";
    return;
  }

  if (key === 38 && d !== "DOWN") {
    d = "UP";
    return;
  }
  if (key === 39 && d !== "LEFT") {
    d = "RIGHT";
    return;
  }
  if (key === 40 && d !== "UP") {
    d = "DOWN";
    return;
  }
};

document.addEventListener("keydown", direction);

const gameOver = () => {
  canvas.style.border = "30px solid orange";
  clearInterval(game);
};

const isColliding = (head, snakeArr) => {
  let result = false;

  snakeArr.forEach((bodyPart) => {
    if (head.x === bodyPart.x && head.y === bodyPart.y) {
      result = true;
    }
  });

  return result;
};

const draw = () => {
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.forEach(({ x, y }, i) => {
    ctx.fillStyle = i === 0 ? "red" : "white";
    ctx.fillRect(x, y, box, box);
  });

  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch (d) {
    case "LEFT":
      snakeX -= box;
      break;
    case "UP":
      snakeY -= box;
      break;
    case "RIGHT":
      snakeX += box;
      break;
    case "DOWN":
      snakeY += box;
      break;
  }

  if (snakeX === food.x && snakeY === food.y) {
    food = createFood();
  } else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < -30 ||
    snakeX > 20 * box ||
    snakeY < -30 ||
    snakeY > 20 * box ||
    isColliding(newHead, snake)
  ) {
    alert("Game Over");
    gameOver();
  }

  snake.unshift(newHead);
};

let game = setInterval(() => {
  draw();
}, 100);
