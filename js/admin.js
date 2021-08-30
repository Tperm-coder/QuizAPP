getCurrClrs();
function getCurrClrs() {
  // IDs in html
  var ids = ["navClr", "ftrClr", "qClr", "sClr"];
  // local storage names
  var names = ["navBarClr", "footerClr", "qBox", "questionArea"];

  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).value = localStorage.getItem(names[i]);
  }
}

function updateClrs() {
  // IDs in html
  var newClrs = [
    document.getElementById("navClr").value,
    document.getElementById("ftrClr").value,
    document.getElementById("qClr").value,
    document.getElementById("sClr").value,
  ];

  // local storage names
  var names = ["navBarClr", "footerClr", "qBox", "questionArea"];

  for (var i = 0; i < newClrs.length; i++) {
    localStorage.setItem(names[i], newClrs[i]);
  }
}
