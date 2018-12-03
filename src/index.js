document.addEventListener('DOMContentLoaded', function(){
fetchAllToys();

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('#toy-collection')
let addToy = false;

addBtn.addEventListener('click', () =>{
  addToy = !addToy
  if (addToy){
    toyForm.style.display = 'block'
  }else{
    toyForm.style.display = 'none'
  }
})

document.addEventListener('submit', createNewToy)
document.addEventListener('click', increaseLikes)

function fetchAllToys(){
  fetch(` http://localhost:3000/toys`)
  .then(res => res.json())
  .then(displayToys)
  }

function displayToys(toys){
  toys.forEach(toy =>{
    toyList.innerHTML += `<div data-id="${toy.id}" class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  })
}

function createNewToy(event){
  event.preventDefault()
    let inputs = document.querySelectorAll('input')
    let toyName = inputs[0].value
    let toyUrl = inputs[1].value
    let data ={
      name: toyName, image: toyUrl, likes: 0}

    toyList.innerHTML += `<div data-id="${data.id}" class="card">
    <h2>${data.name}</h2>
    <img src=${data.image} class="toy-avatar" />
    <p>${data.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`

    fetch(`http://localhost:3000/toys`, {
     method: 'POST',
     body: JSON.stringify(data),
     headers:{
       'Content-Type': 'application/json'
     }
   }).then(console.log)
 }

function increaseLikes(event){
  if(event.target.className ==="like-btn"){
  toyId =  event.target.parentElement.dataset.id
  likeCount = parseInt(event.target.previousElementSibling.innerText)
  like = event.target.previousElementSibling
  like.innerHTML = `${++likeCount} Likes`

  fetch(`http://localhost:3000/toys/${toyId}`, {
   method: 'PATCH',
   body: JSON.stringify({likes: likeCount}),
   headers:{
     'Content-Type': 'application/json'
      }
    })
  }
}

})
