fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
).then(function (respsonse) {
  respsonse.json().then(function (data) {
    console.log(data.results);
  });
});

function logOut() {
  document.location.replace("../html/login.html");
}

function home() {
  document.location.replace("../html/userMainPageHome.html");
}

function takeQuiz() {
  document.location.replace("../html/takeQuiz.html");
}
