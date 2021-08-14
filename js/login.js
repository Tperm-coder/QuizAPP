var json;

function checkLogin() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  json = json["accounts"];
  if (json[email] == password) {
    document.location.replace("../html/userMainPageHome.html");
  } else {
    document.getElementById("invalid").innerText =
      "sorry wrong email or password";
  }
}

function getAccountsData() {
  fetch("../data/accounts.json").then(function (respsonse) {
    respsonse.json().then(function (data) {
      json = data;
      checkLogin();
    });
  });
}
