const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysDiv = document.getElementById("toy-collection")
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', fetchAllToys)
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
toyForm.addEventListener('click', createToy)
// OR HERE!

function fetchAllToys (){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
      .then(iterateOverToys)
}

function iterateOverToys(toys) {
  toys.forEach(displayToy)
}

function displayToy(toy) {
  toysDiv.innerHTML += `<div class="card">
      <h2> ${toy.name} </h2>
      <img src= ${toy.image} height="200" width="200" class="toy-avatar">
      <p data-id= ${toy.id}>${toy.likes} Likes </p>
      <button class="like-btn" data-id = ${toy.id}>Like <3</button>
    </div>`
  prepLikeButton()
}

function prepLikeButton() {
  const likeButtons = document.querySelectorAll('.like-btn')
  likeButtons.forEach(addEventListenerToLikeButton)
}

function addEventListenerToLikeButton(button){
  button.addEventListener('click', likeToy)
}

function likeToy(e) {
  let currentlikes = parseInt(e.target.previousElementSibling.innerText.split(" ").splice(0,1))
  ++currentlikes
  fetch (`http://localhost:3000/toys/${e.target.dataset.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      likes: currentlikes
    })
  }).then(updateLikeHTML(e.target.dataset.id, currentlikes))
}

function updateLikeHTML(toyId, likes){
  let toysLikes = document.querySelector(`div [data-id = "${toyId}"]`)
  toysLikes.innerText = `${likes} Likes`
}

function createToy(e){
  const form = document.querySelector('.add-toy-form')
  if (e.target.className === "submit") {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: `${form.elements[0].value}`,
        image: `${form.elements[1].value}`,
        likes: 0
      })
    })
  }
}
