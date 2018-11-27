document.addEventListener('DOMContentLoaded', function () {
  getToys()
  let formForToy = document.querySelector('.add-toy-form')
  formForToy.addEventListener('submit', function postToy(e) {
    e.preventDefault()
      fetch('http://localhost:3000/toys/',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify({
          "name": formForToy.elements[0].value,
          "image": formForToy.elements[1].value,
          "likes": formForToy.elements[2].value = 0
        })
      }).then(res => res.json()).then(makeToy)
    })
})


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.body.addEventListener("click", () => {
  if (event.target.className === "like-btn"){
  let like = event.target
  addLike(like)
}
})

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
function getToys() {
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  // .then(json => json.forEach())
  .then(function(json) {
    json.forEach((toy) => makeToy(toy))

  })
}
function makeToy(toy) {
  // render a toy to the page (reusable)
  let toyCollection = document.querySelector('#toy-collection')
  toyCollection.innerHTML += `
    <div class="card" >
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p>${toy.likes} </p>
      <button class='like-btn' data-id="${toy.id}">Like <3</button>
    </div>`
  }

  function addLike(like){
  const id =  like.parentElement.dataset.id
  let element = like.previousElementSibling
  let counts = parseInt(element.innerText[0])
  element.innerHTML = `${++counts}`

}





// OR HERE!
