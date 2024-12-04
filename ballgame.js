//ballgame.js
let startBtn = document.getElementById("startBtn");
let gameArea = document.getElementById("gameArea");
let paddle = document.getElementById("paddle");
let ball = document.getElementById("ball");
let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");
let gameOverDisplay = document.getElementById("gameOver");
let restartBtn = document.getElementById("restartBtn");
let pauseBtn = document.getElementById("pauseBtn");

let score = 0;
let lives = 3;
let ballSpeedXValues = [2, 3, 4, 5, -2, -3, -4, -5];
let ballSpeedX =
  ballSpeedXValues[Math.floor(Math.random() * ballSpeedXValues.length)];
let ballSpeedY = 4;
let ballX = 200;
let ballY = 0;
let paddleX = 160;
let gameInterval;
let isPaused = false;
let score = 0;
let lives = 3;
let ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2.1);
let ballSpeedY = 4;
let ballX = 200;
let ballY = 0;
let paddleX = 160;
let gameInterval;
let isPaused = false;

// 鼠标移动挡板
function movePaddle(event) {
  let rect = gameArea.getBoundingClientRect();
  paddleX = event.clientX - rect.left - paddle.offsetWidth / 2;
  if (paddleX < 0) {
    paddleX = 0;
  } else if (paddleX > gameArea.offsetWidth - paddle.offsetWidth) {
    paddleX = gameArea.offsetWidth - paddle.offsetWidth;
  }
  paddle.style.left = paddleX + "px";
}

// 更新球的状态
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // 碰撞检测：边界
  if (ballX <= 0 || ballX >= 380) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // 碰撞检测：挡板
  if (ballY >= 370 && ballX >= paddleX && ballX <= paddleX + 80) {
    if (ballSpeedY > 0) {
      // 只有球向下运动时才有效
      ballSpeedY = -ballSpeedY;
      score++;
      scoreDisplay.textContent = "得分: " + score;

      if (score % 3 === 0) {
        // 每3分球速增加
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
      }
    }
  }

  // 碰撞检测：底部
  if (ballY >= 400) {
    lives--;
    livesDisplay.textContent = "生命值: " + lives;

    if (lives === 0) {
      gameOver();
    } else {
      resetBall();
    }
  }

  // 设置球速上限
  const maxSpeed = 10; // 设置球速上限为10
  if (Math.abs(ballSpeedX) > maxSpeed) {
    ballSpeedX = Math.sign(ballSpeedX) * maxSpeed;
  }
  if (Math.abs(ballSpeedY) > maxSpeed) {
    ballSpeedY = Math.sign(ballSpeedY) * maxSpeed;
  }
}

// 游戏结束
function gameOver() {
  clearInterval(gameInterval);
  gameOverDisplay.style.display = "block"; // 先显示元素
  setTimeout(() => {
    gameOverDisplay.style.opacity = 1; // 然后设置透明度为1，触发过渡效果
  }, 10); // 稍微延迟一下，确保元素已经显示
  restartBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// 重置球的位置
function resetBall() {
  ballX = 200;
  ballY = 0;
}

// 暂停游戏
function togglePause() {
  if (isPaused) {
    gameInterval = setInterval(updateBall, 10);
    pauseBtn.textContent = "暂停";
  } else {
    clearInterval(gameInterval);
    pauseBtn.textContent = "继续";
  }
  isPaused = !isPaused;
}

// 重新开始游戏
function restartGame() {
  score = 0;
  lives = 3;
  ballSpeedX =
    ballSpeedXValues[Math.floor(Math.random() * ballSpeedXValues.length)];
  ballSpeedY = 4;
  scoreDisplay.textContent = "得分: " + score;
  livesDisplay.textContent = "生命值: " + lives;
  gameOverDisplay.style.display = "none";
  restartBtn.style.display = "none";
  resetBall();
  gameInterval = setInterval(updateBall, 10);
  pauseBtn.style.display = "block"; // 显示暂停按钮
}

// 开始游戏
function startGame() {
  gameArea.style.display = "block"; // 显示游戏区域
  startBtn.style.display = "none"; // 隐藏开始按钮
  pauseBtn.style.display = "block"; // 显示暂停按钮
  gameInterval = setInterval(updateBall, 10); // 启动游戏
}

// 监听鼠标移动事件
gameArea.addEventListener("mousemove", movePaddle);

// 开始按钮点击事件
startBtn.addEventListener("click", startGame);

// 暂停按钮事件
pauseBtn.addEventListener("click", togglePause);

// 重新开始按钮事件
restartBtn.addEventListener("click", restartGame);
