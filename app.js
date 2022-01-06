const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
let time = 0;
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let score = 0;

// Кнопка старт
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

// Настройка секунд
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomeCircle();
  }
});

// // Debug
// startGame();

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomeCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  // timeEl.parentNode.remove(); // Можно этот, но будет скачек
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomeCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);

  setColor(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Изменение цвета

const colors = [
  "#f80c0c",
  "#ff8008",
  "#cefa0a",
  "#33ff00",
  "#04dffc",
  "#1504fd",
  "#fd07c8",
  "#a36464",
];

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

// ЛайфХак - Взлом игры (внести в консоль winTheGame()):

function winTheGame() {
  function kill() {
    const winCircle = document.querySelector(".circle");

    if (winCircle) {
      winCircle.click();
    }
  }

  setInterval(kill, 10);
}
