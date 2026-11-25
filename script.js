const game = document.getElementById("game-container");
const apple = document.getElementById("apple");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOver = document.getElementById("game-over");
const startButton = document.getElementById("start-button");

let score = 0;
let lives = 3;
let basketSpeed = 20;
let appleSpeed = 2;
let timer = null;
let playing = false;

// Di chuyển giỏ bằng phím mũi tên
document.addEventListener("keydown", function(event) {
    if (!playing) return;

    let x = basket.offsetLeft;

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        x -= basketSpeed;
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        x += basketSpeed;
    }

    let maxLeft = game.clientWidth - basket.offsetWidth;
    x = Math.max(0, Math.min(x, maxLeft));

    basket.style.left = x + "px";
});

// Đưa táo về vị trí ngẫu nhiên trên đỉnh
function resetApple() {
    let maxLeft = game.clientWidth - apple.offsetWidth;
    let x = Math.random() * maxLeft;

    apple.style.left = x + "px";
    apple.style.top = "0px";
}

// Kiểm tra va chạm giữa táo và giỏ
function checkCollision() {
    let appleLeft = apple.offsetLeft;
    let appleTop = apple.offsetTop;
    let basketLeft = basket.offsetLeft;
    let basketTop = basket.offsetTop;

    return (
        appleLeft < basketLeft + basket.offsetWidth &&
        appleLeft + apple.offsetWidth > basketLeft &&
        appleTop < basketTop + basket.offsetHeight &&
        appleTop + apple.offsetHeight > basketTop
    );
}

// Cập nhật trò chơi
function updateGame() {
    if (!playing) return;

    let y = apple.offsetTop + appleSpeed;
    apple.style.top = y + "px";

    if (checkCollision()) {
        score++;
        scoreDisplay.textContent = score;

        appleSpeed += 0.2;
        resetApple();
    } else if (y + apple.offsetHeight >= game.clientHeight) {
        lives--;
        livesDisplay.textContent = lives;

        if (lives <= 0) {
            endGame();
            return;
        }

        resetApple();
    }
}

// Kết thúc trò chơi
function endGame() {
    playing = false;
    clearInterval(timer);

    apple.style.display = "none";
    gameOver.style.display = "block";
    startButton.disabled = false;
    startButton.textContent = "Chơi lại";
}

// Bắt đầu hoặc chơi lại
function startGame() {
    clearInterval(timer);

    score = 0;
    lives = 3;
    appleSpeed = 2;
    playing = true;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    basket.style.left = "210px";
    apple.style.display = "block";
    gameOver.style.display = "none";

    resetApple();

    startButton.disabled = true;
    startButton.textContent = "Đang chơi";

    timer = setInterval(updateGame, 20);
}

startButton.addEventListener("click", startGame);
