setLoginSession();
function setLoginSession() {
  localStorage.setItem("login", "false");
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

function getAdminData() {
  var temp = {
    admin: {
      pass: "adminn",
      score: 9999999,
    },
  };

  localStorage.setItem("json", JSON.stringify(temp));
}

function checkLogin() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  json = getData();
  console.log(json[""]);
  try {
    if (json[email].pass == password) {
      localStorage.setItem("email", email);
      localStorage.setItem("login", "true");
      document.location.replace("../html/userMainPageHome.html");
    } else {
      document.getElementById("invalid").innerText =
        "sorry wrong email or password";
    }
  } catch (err) {
    document.getElementById("invalid").innerText =
      "sorry wrong email or password";
  }
}

function saveData() {
  var signEmail = document.getElementById("email").value;
  var pass1 = document.getElementById("pass").value;
  var pass2 = document.getElementById("pass2").value;
  if (pass1 == pass2) {
  } else {
    document.getElementById("invalid").innerText =
      "sorry the passwords don't match";
  }
  json = getData();
  try {
    json[signEmail].pass;
    document.getElementById("invalid").innerText =
      "sorry the email already existed";
  } catch (err) {
    json[signEmail];
    json[signEmail] = { pass: pass1, score: 0 };
    localStorage.setItem("json", JSON.stringify(json));
    document.location.replace("../html/login.html");
  }
}
