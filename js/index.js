const pics = [
  "../assets/bgPattern.jpg",
  "../assets/math.jpg",
  "../assets/anime.jpg",
  "../assets/programming.jpg",
];

var curr = 0;

function forward() {
  curr++;
  if (curr > 3) {
    curr = 0;
  }
  updatePic();
}

function back() {
  curr--;
  if (curr < 0) {
    curr = 3;
  }
  console.log(curr);
  updatePic();
}

function updatePic() {
  console.log(pics[curr]);
  document.getElementById(
    "picBox"
  ).style.backgroundImage = `url(${pics[curr]})`;
}

setInterval(forward, 7500);
