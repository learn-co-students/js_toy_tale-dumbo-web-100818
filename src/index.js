const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let nameInput = document.querySelector("#name");
let imageInput = document.querySelector("#image");
let addToy = false;

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(renderToys)
};

function renderToys(json) {
  const toyCollection = document.querySelector("#toy-collection");

  for (toy of json) {
    const card = addCard(toy);
    toyCollection.appendChild(card);
  };
};

function addCard(toy) {
  const cardElement = document.createElement("div");
  const nameElement = document.createElement("h2");
  const imgElement = document.createElement("img");
  const likeElement = document.createElement("p");
  const buttonElement = document.createElement("button");

  cardElement.classList.add("card");
  nameElement.innerHTML = toy.name;
  imgElement.src = toy.image;
  imgElement.classList.add("toy-avatar");
  likeElement.innerHTML = `${toy.likes} Likes`;
  likeElement.id = toy.likes
  buttonElement.classList.add("like-btn");
  buttonElement.innerHTML = "Like <3"
  buttonElement.onclick = addLike;
  buttonElement.id = toy.id;

  cardElement.appendChild(nameElement);
  cardElement.appendChild(imgElement);
  cardElement.appendChild(likeElement);
  cardElement.appendChild(buttonElement);
  return cardElement;
};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit", postToy)
  } else {
    toyForm.style.display = 'none'
  }
})

function postToy() {
  event.preventDefault();

  let toyData = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData)
  })
  .then(resp => resp.json())
  .then(json => console.log("json"))
};

function addLike() {
  let id = event.target.id
  let likeElement = event.target.parentElement.children[2]
  let updatedLikes = parseInt(likeElement.id) + 1
  postLike(id, updatedLikes)
  .then(function(json) {
    likeElement.innerHTML = (`${updatedLikes} Likes`)
    likeElement.id = updatedLikes
  })
}

function postLike(id, updatedLikes) {
  let likeData = {likes:  updatedLikes}

  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likeData)
  })
  .then(resp => resp.json())
}

document.addEventListener("DOMContentLoaded", function(event) {
  fetchToys();
});
