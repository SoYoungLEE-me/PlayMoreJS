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

playButton.addEventListener("click", play);

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

  if (1 > userValue || userValue > 100) {
    alert("1부터 100까지의 숫자를 입력하세요");
    return;
  }

  if (userValue < computerNum) {
    hintArea.innerHTML = "Hint : <strong>UP!</strong>"; // 굵게 표시
  } else if (userValue > computerNum) {
    hintArea.innerHTML = "힌트 : <strong>DOWN!</strong>"; // 굵게 표시
  } else {
    hintArea.innerHTML = "<strong>정답!</strong>";
  }
}

pickRandomNum();
