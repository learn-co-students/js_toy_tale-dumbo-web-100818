const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.getElementById('new-toy-form')
let addToy = false
let toyCollection = document.getElementById('toy-collection')

let fetchToy = fetch('http://localhost:3000/toys').then(res => res.json())

// YOUR CODE HERE

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

fetchToy
.then(toys => {

  toys.forEach((toy) => {
    toyCollection.innerHTML += `<div class="card" <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id= ${toy.id}>Like <3</button>`

  })

})

toyCollection.addEventListener('click', function(e){
  if(e.target.className == 'like-btn')
  addLike(e)
})

newToyForm.addEventListener('submit', function(e){
  let toyName = document.getElementById('toy').value
  let toyImg = document.getElementById('img').value
  newToy(toyName, toyImg)
})



function addLike(e){
  let currentLikes = e.target.previousElementSibling.innerText[0]
  let asNumber = parseInt(currentLikes)
  let newValue = asNumber + 1
  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
    method:"PATCH",
    headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({"likes": newValue })
  })
  e.target.previousElementSibling.innerText = `${newValue} Likes`
}

function newToy(name, image) {
  fetch(`http://localhost:3000/toys/`,{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({"name": name, "image": image, "likes": 0 })
  })
}


//
