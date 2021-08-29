const radName = "radioBtn";
const btn = `<div class="row nxtBtn"><div onclick="nextQuestion()" class="btn">Next</div></div>`;
const res = `<div id="res" class="result"></div>`;
const map = {
  Math: "19",
  General_knowledge: "9",
  Computer: "18",
  AnimeMange: "31",
};
var score = 0;
var index = -1;

checkLoginSession();
function checkLoginSession() {
  if (localStorage.getItem("login") == "false") {
    logOut();
  }
}

checkCurrentUrl();
function checkCurrentUrl() {
  var url = window.location.pathname;
  url = url.split("/");
  if (url[2] == "profile.html") {
    getProfiledata();
  }
}
function logOut() {
  document.location.replace("../html/login.html");
}

function home() {
  document.location.replace("../html/userMainPageHome.html");
}

function takeQuiz() {
  document.location.replace("../html/takeQuiz.html");
}

function profile() {
  document.location.replace("../html/profile.html");
}

function getProfiledata() {
  if (localStorage.getItem("email") == "admin") {
    document.location.replace("../html/admin.html");
  } else {
    var json = getData();
    document.getElementById("name").textContent = `Hi ${localStorage.getItem(
      "email"
    )}`;
    document.getElementById("score").textContent = `Your score is : ${
      json[localStorage.getItem("email")].score
    }`;
  }
}

function getData() {
  var json = localStorage.getItem("json");
  if (json === null) {
    getAdminData();
    return JSON.parse(localStorage.getItem("json"));
  } else {
    return JSON.parse(json);
  }
}

function start() {
  document.getElementById("qBox").innerHTML = "";
  index = -1;
  // clear question area

  // taking user input
  var category = document.getElementById("category").value;
  var difficulty = document.getElementById("difficulty").value;

  // creating url
  var url = `https://opentdb.com/api.php?amount=10&category=${map[category]}&difficulty=${difficulty}&type=multiple`;

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
  if (index == 10) {
    document.getElementById("qBox").innerHTML = "";
    console.log(score);
    updateScore();
  } else {
    var question = document.createElement("div");
    question.innerText = formatString(json[index].question);
    question.className = "q";
    var options = ["1", "2", "3", "4"];
    var random = Math.floor(Math.random() * 4);
    options[random] = formatString(json[index].correct_answer);
    for (var i = 0, j = 0; i < 4; i++) {
      if (i == random) {
        continue;
      }
      options[i] = formatString(json[index].incorrect_answers[j]);
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
    document.getElementById("qBox").innerHTML = "";
    index++;
    showQuestions();
  }
}

function formatString(question) {
  return question;
}

function updateScore() {
  json = getData();
  json[localStorage.getItem("email")].score = score;
  localStorage.setItem("json", JSON.stringify(json));
  score = 0;
}
