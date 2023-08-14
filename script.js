console.log("hello");

const requestAPI = async function () {
  const response = await fetch("https://api.github.com/users/davemakara");
  const data = await response.json();
  console.log(data);
};

requestAPI();
