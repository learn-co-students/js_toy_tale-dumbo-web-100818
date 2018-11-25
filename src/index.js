const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let nameInput = document.querySelector("#name");
let imageInput = document.querySelector("#image");
let addToy = false;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener("submit", postToy)
  } else {
    toyForm.style.display = 'none'
  }
})


function postToy() {
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
  .then(json => console.log(json))
};

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
  buttonElement.classList.add("like-btn");
  buttonElement.innerHTML = "Like <3"

  cardElement.appendChild(nameElement);
  cardElement.appendChild(imgElement);
  cardElement.appendChild(likeElement);
  cardElement.appendChild(buttonElement);
  return cardElement;
};

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Page has loaded!");
  fetchToys();
});
