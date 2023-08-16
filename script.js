"use strict";

let darkTheme = true;

const requestAPI = async function () {
  const response = await fetch("https://api.github.com/users/davemakara");
  const data = await response.json();
  console.log(data);
};

requestAPI();

document.querySelector("#changeThemeBtn").addEventListener("click", () => {
  darkTheme = !darkTheme;
  console.log(darkTheme);
  document.querySelector(".body").classList.toggle("darkMain");
});
