"use strict";

const body = document.querySelector(".body");
const userCard = document.querySelector("#user-card");
const inputUsername = document.querySelector("#github-username");
const btnSearchUser = document.querySelector("#BtnSubmit");
const searchError = document.querySelector("#search-error");
const emptyFieldError = document.querySelector("#empty-field");
let html;
let loading = true;
let loginInfo;

const renderDate = (date) => {
  let getDate = new Date(date);
  let dateToArray = getDate.toDateString().slice(4).split(" ");
  let [month, day, year] = dateToArray;
  let finalDate = [day, month, year].join(" ");

  return finalDate;
};

let renderCard = (dev) => {
  html = ` <div class="userTop">
  <img
    src="${dev.avatar_url}"
    alt="user profile image"
    class="userImg"
    id="user-img"
  />
  <div class="userTopInfo">
    <div class="nameAndUsername">
      <h2 class="userName" id="user-name">${
        dev.name !== null ? dev.name : "Not Available"
      }</h2>
      <h3 class="userUsername" id="user-username">@${dev.login}</h3>
    </div>
    <div>
      <span class="date" id="user-date">Joined ${renderDate(
        dev.created_at
      )}</span>
    </div>
  </div>
  </div>
  <div class="userMain">
      <p class="userBio" id="user-bio">
      ${dev.bio !== null ? dev.bio : "This profile has no bio"}
      </p>
  <ul class="userStats">
    <li>
      <h4 class="statsInfo" id="stats-info">Repos</h4>
      <h2 class="statsNumber" id="stats-number">${dev.public_repos}</h2>
    </li>
    <li>
      <h4 class="statsInfo" id="stats-info">Followers</h4>
      <h2 class="statsNumber" id="stats-number">${dev.followers}</h2>
    </li>
    <li>
      <h4 class="statsInfo" id="stats-info">Following</h4>
      <h2 class="statsNumber" id="stats-number">${dev.following}</h2>
    </li>
  </ul>
  <div class="links">
    <div class="insideLinks">
      <i class="fa-solid fa-location-dot"></i>
      <span class="insideLinkInfo" id="locationInfo">${
        dev.location !== null ? dev.location : "Not Available"
      }</span>   
    </div>
    <div class="insideLinks">
      <i class="fa-brands fa-twitter"></i>
      <a href="#" class="insideLinkInfo" id="twitterInfo">
      ${dev.twitter_username !== null ? dev.twitter_username : "Not Available"}
    </a>
    </div>
    <div class="insideLinks">
      <i class="fa-solid fa-link"></i>
      <a href="#" class="insideLinkInfo" id="blogInfo">
      ${dev.blog !== "" ? dev.blog : "Not Available"}
      </a>
    </div>
    <div class="insideLinks">
      <i class="fa-solid fa-building"></i>
      <a href="#" class="insideLinkInfo" id="companyInfo">
      ${dev.company !== null ? dev.company : "Not Available"}
      </a>
    </div>
  </div>
  </div>`;

  //   userCard.insertAdjacentHTML("beforeend", html);
  userCard.innerHTML = html;
};

const requestAPI = async function () {
  try {
    const response = await fetch("https://api.github.com/users/davemakara");
    if (!response.ok) {
      throw new Error(`Problem occurred.. No user found!`);
    }
    const data = await response.json();
    console.log(data);

    //     html = ` <div class="userTop">
    //   <img
    //     src="${data.avatar_url}"
    //     alt="user profile image"
    //     class="userImg"
    //     id="user-img"
    //   />
    //   <div class="userTopInfo">
    //     <div class="nameAndUsername">
    //       <h2 class="userName" id="user-name">${data.name}</h2>
    //       <h3 class="userUsername" id="user-username">@${data.login}</h3>
    //     </div>
    //     <div>
    //       <span class="date" id="user-date">Joined ${renderDate(
    //         data.created_at
    //       )}</span>
    //     </div>
    //   </div>
    //   </div>
    //   <div class="userMain">
    //       <p class="userBio" id="user-bio">
    //       ${data.bio !== null ? data.bio : "This profile has no bio"}
    //       </p>
    //   <ul class="userStats">
    //     <li>
    //       <h4 class="statsInfo" id="stats-info">Repos</h4>
    //       <h2 class="statsNumber" id="stats-number">${data.public_repos}</h2>
    //     </li>
    //     <li>
    //       <h4 class="statsInfo" id="stats-info">Followers</h4>
    //       <h2 class="statsNumber" id="stats-number">${data.followers}</h2>
    //     </li>
    //     <li>
    //       <h4 class="statsInfo" id="stats-info">Following</h4>
    //       <h2 class="statsNumber" id="stats-number">${data.following}</h2>
    //     </li>
    //   </ul>
    //   <div class="links">
    //     <div class="insideLinks">
    //       <i class="fa-solid fa-location-dot"></i>
    //       <span class="insideLinkInfo" id="locationInfo">${
    //         data.location !== null ? data.location : "Not Available"
    //       }</span>
    //     </div>
    //     <div class="insideLinks">
    //       <i class="fa-brands fa-twitter"></i>
    //       <a href="#" class="insideLinkInfo" id="twitterInfo">
    //       ${
    //         data.twitter_username !== null ? data.twitter_username : "Not Available"
    //       }
    //     </a>
    //     </div>
    //     <div class="insideLinks">
    //       <i class="fa-solid fa-link"></i>
    //       <a href="#" class="insideLinkInfo" id="blogInfo">
    //       ${data.blog !== "" ? data.blog : "Not Available"}
    //       </a>
    //     </div>
    //     <div class="insideLinks">
    //       <i class="fa-solid fa-building"></i>
    //       <a href="#" class="insideLinkInfo" id="companyInfo">
    //       ${data.company !== null ? data.company : "Not Available"}
    //       </a>
    //     </div>
    //   </div>
    //   </div>`;

    //     //   userCard.insertAdjacentHTML("beforeend", html);
    //     userCard.innerHTML = html;

    renderCard(data);

    const userLocation = document.querySelector("#locationInfo");
    const userTwitter = document.querySelector("#twitterInfo");
    const userBlog = document.querySelector("#blogInfo");
    const userCompany = document.querySelector("#companyInfo");

    const location = data.location;
    const twitter = data.twitter_username;
    const blog = data.blog;
    const company = data.company;

    const checkLinks = (loc, twit, bl, comp) => {
      if (loc === null) {
        userLocation.classList.add("noUserLink");
      }
      if (twit === null) {
        userTwitter.classList.add("noUserLink");
      }
      if (bl === "") {
        userBlog.classList.add("noUserLink");
      }
      if (comp === null) {
        userCompany.classList.add("noUserLink");
      }
    };

    checkLinks(location, twitter, blog, company);

    //   if (data.twitter_username === null) {
    //     userTwitter.classList.add("noUserLink");
    //   }

    //   if (data.blog === "") {
    //     userBlog.classList.add("noUserLink");
    //   }

    //   if (data.company === null) {
    //     userCompany.classList.add("noUserLink");
    //   }
  } catch (err) {
    html = `<h1 class="errorMessage" id="error-message">${err.message}</h1>`;
    userCard.innerHTML = html;
    // console.log(err);
  }
};

requestAPI();

btnSearchUser.addEventListener("click", (e) => {
  e.preventDefault();
  const inputUsernameLowercase = inputUsername.value.toLowerCase();

  const getUserData = async function (user) {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        throw new Error(`Problem occurred.. No user found!`);
      }
      const data = await response.json();
      console.log(data);
      loginInfo = data.login;

      // html = ` <div class="userTop">
      //       <img
      //         src="${data.avatar_url}"
      //         alt="user profile image"
      //         class="userImg"
      //         id="user-img"
      //       />
      //       <div class="userTopInfo">
      //         <div class="nameAndUsername">
      //           <h2 class="userName" id="user-name">${data.name}</h2>
      //           <h3 class="userUsername" id="user-username">@${data.login}</h3>
      //         </div>
      //         <div>
      //           <span class="date" id="user-date">Joined ${renderDate(
      //             data.created_at
      //           )}</span>
      //         </div>
      //       </div>
      //       </div>
      //       <div class="userMain">
      //           <p class="userBio" id="user-bio">
      //           ${data.bio !== null ? data.bio : "This profile has no bio"}
      //           </p>
      //       <ul class="userStats">
      //         <li>
      //           <h4 class="statsInfo" id="stats-info">Repos</h4>
      //           <h2 class="statsNumber" id="stats-number">${
      //             data.public_repos
      //           }</h2>
      //         </li>
      //         <li>
      //           <h4 class="statsInfo" id="stats-info">Followers</h4>
      //           <h2 class="statsNumber" id="stats-number">${data.followers}</h2>
      //         </li>
      //         <li>
      //           <h4 class="statsInfo" id="stats-info">Following</h4>
      //           <h2 class="statsNumber" id="stats-number">${data.following}</h2>
      //         </li>
      //       </ul>
      //       <div class="links">
      //         <div class="insideLinks">
      //           <i class="fa-solid fa-location-dot"></i>
      //           <span class="insideLinkInfo" id="locationInfo">${
      //             data.location !== null ? data.location : "Not Available"
      //           }</span>
      //         </div>
      //         <div class="insideLinks">
      //           <i class="fa-brands fa-twitter"></i>
      //           <a href="#" class="insideLinkInfo" id="twitterInfo">
      //           ${
      //             data.twitter_username !== null
      //               ? data.twitter_username
      //               : "Not Available"
      //           }
      //         </a>
      //         </div>
      //         <div class="insideLinks">
      //           <i class="fa-solid fa-link"></i>
      //           <a href="#" class="insideLinkInfo" id="blogInfo">
      //           ${data.blog !== "" ? data.blog : "Not Available"}
      //           </a>
      //         </div>
      //         <div class="insideLinks">
      //           <i class="fa-solid fa-building"></i>
      //           <a href="#" class="insideLinkInfo" id="companyInfo">
      //           ${data.company !== null ? data.company : "Not Available"}
      //           </a>
      //         </div>
      //       </div>
      //       </div>`;

      // userCard.innerHTML = html;
      renderCard(data);

      const userLocation = document.querySelector("#locationInfo");
      const userTwitter = document.querySelector("#twitterInfo");
      const userBlog = document.querySelector("#blogInfo");
      const userCompany = document.querySelector("#companyInfo");

      const location = data.location;
      const twitter = data.twitter_username;
      const blog = data.blog;
      const company = data.company;

      const checkLinks = (loc, twit, bl, comp) => {
        if (loc === null) {
          userLocation.classList.add("noUserLink");
        }
        if (twit === null) {
          userTwitter.classList.add("noUserLink");
        }
        if (bl === "") {
          userBlog.classList.add("noUserLink");
        }
        if (comp === null) {
          userCompany.classList.add("noUserLink");
        }
      };

      checkLinks(location, twitter, blog, company);
    } catch (err) {
      html = `<h1 class="errorMessage" id="error-message">${err.message}</h1>`;
      userCard.innerHTML = html;
    }

    if (inputUsername.value === "") {
      emptyFieldError.classList.remove("hidden");
    }

    if (inputUsername.value !== "" && inputUsernameLowercase !== loginInfo) {
      searchError.classList.remove("hidden");
      emptyFieldError.classList.add("hidden");
    }

    if (inputUsername.value !== "" && inputUsernameLowercase === loginInfo) {
      searchError.classList.add("hidden");
      emptyFieldError.classList.add("hidden");
      console.log("hello");
    }
  };

  getUserData(inputUsernameLowercase);
});
