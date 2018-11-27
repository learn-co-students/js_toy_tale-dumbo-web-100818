document.addEventListener('DOMContentLoaded', ()=>{
  getToys()
})


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
// YOUR CODE HERE

document.body.addEventListener('click', ()=> {
  if(event.target.className === "like-btn"){
    let like = event.target
    addLike(like)
  }
})

function getToys(){
  let toys = document.getElementById('toy-collection')
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => {
    json.forEach(toy => {
        toys.innerHTML += `<div data-id="${toy.id}" class="card"> <h2>${toy.name}</h2><p>${toy.likes} Likes!</p> <img class = "toy-avatar" src = "${toy.image}"> <button class = "like-btn">Like</button></div>`
    })
  })
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form

  const create = document.querySelector('.submit')
  create.addEventListener('click', (e)=> {

    event.preventDefault()
    const inputs = document.querySelectorAll('.input-text')
    const name = inputs[0].value
    const image = inputs[1].value

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:
      JSON.stringify({"name": name, "image": image, "likes": 0})
    }).then(response => response.json()).then(getToys)

  })
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here


  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!

function addLike(like){

  let id = like.parentElement.dataset.id
  let likesElement = like.previousElementSibling.previousElementSibling
  let likeCount = parseInt(likesElement.innerHTML[0])
  likesElement.innerHTML = `${++likeCount} Likes!`

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:
    JSON.stringify({"likes": likeCount})
  }).then(response => response.json()).then(console.log)
}
