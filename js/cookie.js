let cookieButton = document.getElementById("cookieButtonAccept");
let cookieButtonSettings = document.getElementById("cookieButtonSettings");
let cookieBar = document.getElementById("cookieBar");
let cookieBarSettings = document.getElementById("cookieBarSettings");
cookieButton.addEventListener("click", function () {
  localStorage.setItem("cookie", "true");
  cookieBar.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookie")) {
    cookieBar.style.display = "none";
  } else {
    cookieBar.style.display = "flex";
  }
});
cookieButtonSettings.addEventListener("click", function () {
  cookieBar.style.display = "none";
  cookieBarSettings.style.display = "flex";
});

const performanceButton = document.getElementById("performanceButton");
const statisticsButton = document.getElementById("statisticsButton");
const marketingButton = document.getElementById("marketingButton");

const buttons = {
  performance: performanceButton,
  statistics: statisticsButton,
  marketing: marketingButton,
};
let cookieValue = null;
for (let key in buttons) {
  buttons[key].addEventListener("click", function () {
    for (let btn in buttons) {
      if (btn === key) {
        document.getElementById(btn).classList.add("checked");
        cookieValue = key;
        warning.classList.remove("visible");
      } else {
        document.getElementById(btn).classList.remove("checked");
      }
    }
  });
}
let confirmButton = document.getElementById("confirmButton");
let warning = document.getElementById("warning");
confirmButton.addEventListener("click", function () {
  if (cookieValue !== null) {
    cookieBarSettings.style.display = "none";
    localStorage.setItem("cookie", `${cookieValue}`);
  }
  if (cookieValue === null) {
    warning.classList.add("visible");
  }
});
