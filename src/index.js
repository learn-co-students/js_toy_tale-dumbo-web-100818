const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyUrl = 'http://localhost:3000/toys'
let addToy = false

// YOUR CODE HERE



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector('.add-toy-form').addEventListener('submit', addTheToy)
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener('DOMContentLoaded', getToys)

function addSection(toy) {
  toyCollection.innerHTML += `
    <div data-id="${toy.id}" class="card"  >
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} </p>
      <button class='like-btn'>Like <3</button>
    </div>
    `
}

function getToys() {
  return fetch(toyUrl).then(res => res.json()).then(json => {
    json.forEach(toy => {
      addSection(toy)
    })
  })
}

function addTheToy(e) {
  e.preventDefault()

  let inputs = document.querySelectorAll('.input-text')
  let name = inputs[0].value
  let image = inputs[1].value

  let sendy = {
    name: name,
    image: image,
    likes: 0
  }

  addSection(sendy)
  fetch(toyUrl, {
    method: "POST",
    body: JSON.stringify(sendy),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

document.body.addEventListener('click', addLike)

function addLike(e) {
  if (e.target.className === 'like-btn') {
    let id = e.target.parentElement.dataset.id
    let like = e.target.previousElementSibling
    let likenum = parseInt(e.target.previousElementSibling.innerText)
    like.innerText = `${++likenum}`

    fetch(`${toyUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        likes: likenum
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
}
// OR HERE!
