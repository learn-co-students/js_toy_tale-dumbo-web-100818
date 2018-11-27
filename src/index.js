const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', ()=> {
  const cards = document.querySelectorAll('.card')

  cards.addEventListener('click', (e) => {
    // if e.target ===
    console.log(e.target)
  })
})
// YOUR CODE HERE
let toys = document.getElementById('toy-collection')
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(json => {
  json.forEach(toy => {
      toys.innerHTML += `<div data-id="${toy.id}" class="card"> <h2>${toy.name}</h2><p>${toy.likes}  Likes!</p> <img class = "toy-avatar" src = "${toy.image}"> <button class = "like-btn">Like</button></div> `
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const create = document.querySelector('.submit')
    create.addEventListener('click', (e)=> {
        event.preventDefault()
        const toyName = document.getElementsByClassName("input-text")[0].value
        const toyImage =
        document.getElementsByClassName("input-text")[1].value
        fetch('http://localhost:3000/toys', {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body:
            JSON.stringify(
          {
            "name": toyName,
            "image": toyImage,
            "likes": 0
          })
        }).then(res => res.json()).then(json => console.log(json))
    })

  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
