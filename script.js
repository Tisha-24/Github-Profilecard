const API = "https://api.github.com/users/";

const form = document.querySelector(".form");
const userInput = document.querySelector(".user-input");
const mainCard = document.querySelector(".card-bg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = userInput.value.trim();
  fetchData(newUser);
  userInput.value = "";
});

async function fetchData(newUser) {
  const userInfo = await fetch(API + newUser);
  const data = await userInfo.json();
  const card = `<div class="card">
          <div class="info">
            <div class="image">
              <img src=${data.avatar_url} alt="img" />
              <div class="info2">
              <div class="name">
            <h2>${data.name}</h2>
            </div>
            </div>
            </div>
            
            <div class="numbers">
                <div>${data.followers}</div>
              <div>Followers</div>
            </div>
              <div class="numbers">
              <div>${data.following}</div>
                  <div>Following</div>
              </div>
              <div class="numbers">
                <div>${data.public_repos}</div>
                <div>Repos</div>
              </div>
            </div>
            <div class="bio">
              <p>${data.bio}</p>
            </div>
          <div class="repos">
          </div>
             </div>`;
  mainCard.innerHTML = card;
  fetchRepo(newUser)
}


async function fetchRepo(newUser) {
  const repos = document.querySelector(".repos");
  const userInfo = await fetch(API + newUser + "/repos");
  const data = await userInfo.json();
  data.forEach((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);
  });
}
