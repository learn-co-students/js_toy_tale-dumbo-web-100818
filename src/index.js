const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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


// OR HERE!






document.addEventListener("DOMContentLoaded",(event) => {
  getToys()
});
document.getElementById("toy-collection").addEventListener("click", function(event){
  event.preventDefault()
  likeBtnClicked(event)

})


function getToys() {
  let url = ("http://localhost:3000/toys")
  fetch(url)
  .then(res => res.json())
  .then(json => addToToyCollection(json))
  .catch(err => console.log(err))
};


function addToToyCollection(givenToys) {
  let toyContainer = document.getElementById("toy-collection")
    for(el in givenToys){
      let toy = givenToys[el]
        let toyEl = `<div class="card">
                      <h2>${toy.name}</h2>
                      <img src="${toy.image}" class="toy-avatar"/>
                      <p>${toy.likes} Likes</p>
                      <button class="like-btn" data-id="${toy.id}"> Like <3</button>
                    </div>`
  toyContainer.innerHTML+=toyEl
  }
}




document.getElementById("toy-form").addEventListener("submit", function (element){

    let data = {name: element.target.children.name.value, imgUrl: element.target.children.image.value}
    // let imgUrl = element.target.children.image.value
    postNewToy(element.target.children.name.value,element.target.children.image.value)
})

function postNewToy(givenName, givenUrl) {
  let url = ("http://localhost:3000/toys")
  fetch(url,{
    method:"POST",
      headers:
     {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({"name": givenName, "image": givenUrl, "likes": 0})
   }).then(res => res.json())
}

function likeBtnClicked(givenEvent) {
  let id = parseInt(givenEvent.target.dataset.id)
  let likesElement = givenEvent.target.previousElementSibling
  let likeAmount = parseInt(likesElement.innerText)
  let newLikeAmount = ++likeAmount
  likesElement.innerText = `${newLikeAmount} Likes`
  fetch(`http://localhost:3000/toys/${id}`, {method: "PATCH",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({"likes" : newLikeAmount})
      })
}
