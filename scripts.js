const holes = document.querySelectorAll(".hole");

const scoreBoard = document.querySelector(".score");

const moles = document.querySelectorAll(".mole");

const countdownBoard = document.querySelector(".countdown");

const startButton = document.querySelector(".startButton");

const topScore = document.querySelector(".topScore");

let localStorage = window.localStorage;
let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let highScore = localStorage.getItem("highScore");
let countdown;

const setHighScore = () => {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    topScore.textContent = `${highScore}`;
    console.log(score);
    console.log(localStorage.getItem("highScore"));
  } else {
    topScore.textContent = `${highScore}`;
    console.log(score);
    console.log(localStorage.getItem("highScore"));
  }
};

window.onload = setHighScore();

const pickRandomHole = (holes) => {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];

  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
};

const popOut = () => {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time);
};

popOut();

const startGame = () => {
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = "block";
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(() => {
    timeUp = true;
  }, timeLimit);

  let startCountdown = setInterval(() => {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      setHighScore();
      clearInterval(startCountdown);
      countdownBoard.textContent = "Times Up!! Thanks for playing.";
    }
  }, 1000);
};

startButton.addEventListener("click", startGame);

// function whack(e) {
//   score++;
//   console.log(e);
//   console.log(this);
//   this.style.backgroundImage = 'url("yoda2.png")';
//   this.style.pointerEvents = "none";

//   setTimeout(() => {
//     this.style.backgroundImage = 'url("yoda1.png")';
//     this.style.pointerEvents = "all";
//   }, 800);

//   scoreBoard.textContent = score;
// }

// moles.forEach((mole) => mole.addEventListener("click", whack));

moles.forEach((mole) => {
  mole.addEventListener("click", (e) => {
    score++;
    console.log(e.target);
    e.target.style.backgroundImage = 'url("yoda2.png")';
    e.target.style.pointerEvents = "none";

    setTimeout(() => {
      e.target.style.backgroundImage = 'url("yoda1.png")';
      e.target.style.pointerEvents = "all";
    }, 800);

    scoreBoard.textContent = score;
  });
});
