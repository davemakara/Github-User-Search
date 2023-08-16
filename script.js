"use strict";

const body = document.querySelector(".body");
const userCard = document.querySelector("#user-card");

const requestAPI = async function () {
  const response = await fetch("https://api.github.com/users/davemakara");
  const data = await response.json();
  console.log(data);

  let html = ` <div class="userTop">
  <img
    src="${data.avatar_url}"
    alt="user profile image"
    class="userImg"
    id="user-img"
  />
  <div class="userTopInfo">
    <div class="nameAndUsername">
      <h2 class="userName" id="user-name">${data.name}</h2>
      <h3 class="userUsername" id="user-username">@${data.login}</h3>
    </div>
    <div>
      <span class="date" id="user-date">Joined 26 Jul 2022</span>
    </div>
  </div>
  </div>
  <div class="userMain">
      <p class="userBio" id="user-bio">
      ${data.bio !== null ? data.bio : "This profile has no bio"}
      </p>
  <ul class="userStats">
    <li>
      <h4 class="statsInfo" id="stats-info">Repos</h4>
      <h2 class="statsNumber" id="stats-number">${data.public_repos}</h2>
    </li>
    <li>
      <h4 class="statsInfo" id="stats-info">Followers</h4>
      <h2 class="statsNumber" id="stats-number">${data.followers}</h2>
    </li>
    <li>
      <h4 class="statsInfo" id="stats-info">Following</h4>
      <h2 class="statsNumber" id="stats-number">${data.following}</h2>
    </li>
  </ul>
  <div class="links">
    <div class="insideLinks">
      <i class="fa-solid fa-location-dot"></i>
      <span class="insideLinkInfo">${
        data.location !== null ? data.location : "Not Available"
      }</span>   
    </div>
    <div class="insideLinks">
      <i class="fa-brands fa-twitter"></i>
      <a href="#" class="insideLinkInfo" id="twitterInfo">
      ${
        data.twitter_username !== null ? data.twitter_username : "Not Available"
      }
    </a>
    </div>
    <div class="insideLinks">
      <i class="fa-solid fa-link"></i>
      <a href="#" class="insideLinkInfo" id="blogInfo">
      ${data.blog !== "" ? data.blog : "Not Available"}
      </a>
    </div>
    <div class="insideLinks">
      <i class="fa-solid fa-building"></i>
      <a href="#" class="insideLinkInfo" id="companyInfo">
      ${data.company !== null ? data.company : "Not Available"}
      </a>
    </div>
  </div>
  </div>`;

  userCard.insertAdjacentHTML("beforeend", html);

  const userTwitter = document.querySelector("#twitterInfo");
  const userBlog = document.querySelector("#blogInfo");
  const userCompany = document.querySelector("#companyInfo");

  if (data.twitter_username === null) {
    userTwitter.classList.add("noUserLink");
  }

  if (data.blog === "") {
    userBlog.classList.add("noUserLink");
  }

  if (data.company === null) {
    userCompany.classList.add("noUserLink");
  }
};

requestAPI();
