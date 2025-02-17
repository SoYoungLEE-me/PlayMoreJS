//랜덤번호 지정
//유저가 번호를 입력한다.
//버튼을 누르면 값이 들어온다.
//랜덤 번호가 유저 입력 번호보다 낮으면 Down
//랜덤 번호가 유저 입력 번호보다 높으면 Up
//5번의 기회를 다쓰면 게임이 끝난다.(버튼 사용X)
//유저 입력 번호의 범위는 1~100을 넘지 않는다.(기획 소진X, 알림)
//유저가 중복 번호를 입력하면 알림(기회 소진X)
//reset 버튼을 누르면 게임 리셋

let computerNum = 0;
let randomNumArea = document.getElementById("randomNum-area"); //임시 정답 표시
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let hintArea = document.getElementById("hint-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");

let chance = 3;
let history = [];
let gameOver = false;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  randomNumArea.innerHTML = `임시 정답 표시 : <span>${computerNum}</span>`;
}

function play() {
  let userValue = userInput.value;

  if (userValue === "" || isNaN(userValue)) {
    alert("숫자를 입력하세요");
    return;
  }

  if (history.includes(userValue)) {
    hintArea.innerHTML = "이미 입력된 값입니다. 다시 입력해주세요";
    return;
  }

  if (1 > userValue || userValue > 100) {
    alert("1부터 100까지의 숫자를 입력하세요");
    return;
  }

  if (userValue < computerNum) {
    hintArea.innerHTML = "<strong> UP!</strong>"; // 굵게 표시
    chance--;
  } else if (userValue > computerNum) {
    hintArea.innerHTML = "<strong>DOWN!</strong>"; // 굵게 표시
    chance--;
  } else {
    hintArea.innerHTML = "<strong>정답!</strong>";
    chanceArea.innerHTML = "🎉 축하합니다! 정답을 맞추셨습니다!";
    gameOver = true;
  }

  history.push(userValue);

  if (chance > 0 && !gameOver) {
    chanceArea.innerHTML = `남은 기회는 ${chance}번!`;
  } else if (chance == 0) {
    chanceArea.innerHTML = "❌ 기회 소진! 다음에 도전하세요!";
    hintArea.innerHTML = "";
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  hintArea.innerHTML = "";
  chanceArea.innerHTML = "";
  playButton.disabled = false;
  pickRandomNum();
  chance = 3;
  history = [];
  gameOver = false;
}

pickRandomNum();

// 모달 열고 닫기 기능
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("game-modal");
  const openModalBtn = document.getElementById("open-modal-button");
  const closeModalBtn = document.querySelector(".close-button");

  // 모달 열기
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // 모달 닫기
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 배경 클릭 시 모달 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
