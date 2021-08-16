const radName = "radioBtn";
const btn = `<div class="row nxtBtn"><div onclick="nextQuestion()" class="btn">Next</div></div>`;
const res = `<div id="res" class="result"></div>`;
var json;
var category;
var difficulty;
var url;
var score = 0;
var index = -1;
var score = 0;
const map = {
  Math: "19",
  General_knowledge: "9",
  Computer: "18",
  AnimeMange: "31",
};
function logOut() {
  document.location.replace("../html/login.html");
}

function home() {
  document.location.replace("../html/userMainPageHome.html");
}

function takeQuiz() {
  document.location.replace("../html/takeQuiz.html");
}

function start() {
  index = -1;
  // clear question area

  // taking user input
  category = document.getElementById("category").value;
  difficulty = document.getElementById("difficulty").value;

  // creating url
  url = `https://opentdb.com/api.php?amount=10&category=${map[category]}&difficulty=${difficulty}&type=multiple`;

  // fetching data
  fetch(url).then(function (respsonse) {
    respsonse.json().then(function (data) {
      json = data.results;
      next();
    });
  });
}

function next() {
  index++;
  showQuestions();
}

function showQuestions() {
  // getRadioBtn();
  if (index == 10) {
    document.getElementById("qBox").innerHTML = "";
    console.log(score);
  } else {
    var question = document.createElement("div");
    question.innerText = json[index].question;
    question.className = "q";
    var options = ["1", "2", "3", "4"];
    var random = Math.floor(Math.random() * 4);
    options[random] = json[index].correct_answer;
    for (var i = 0, j = 0; i < 4; i++) {
      if (i == random) {
        continue;
      }
      options[i] = json[index].incorrect_answers[j];
      j++;
    }
    // console.log(options);
    document.getElementById("qBox").appendChild(question);
    for (var i = 0; i < 4; i++) {
      document.getElementById("qBox").appendChild(getRadioBtn(options[i]));
    }
    var nextBtn = document.createElement("div");
    nextBtn.innerHTML = btn;
    document.getElementById("qBox").appendChild(nextBtn);
  }
}

function getRadioBtn(text) {
  var question = document.createElement("div");
  var input = document.createElement("input");
  var txt = document.createElement("span");
  txt.className = "spn";
  txt.innerText = text;
  input.type = "radio";
  input.name = radName;
  input.className = "rad";
  input.value = text;
  question.appendChild(input);
  question.appendChild(txt);
  return question;
}

function nextQuestion() {
  var correct = false;
  var choices = document.getElementsByClassName("rad");
  for (var i = 0; i < 4; i++) {
    if (choices[i].checked)
      if (choices[i].value == json[index].correct_answer) {
        correct = true;
      }
  }
  if (correct) {
    index++;
    document.getElementById("qBox").innerHTML = "";
    if (difficulty == "easy") {
      score += 5;
    } else if (difficulty == "hard") {
      score += 15;
    } else {
      score += 10;
    }
    showQuestions();
  } else {
    index++;
    showQuestions();
  }
}
