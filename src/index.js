const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const realForm = document.querySelector('.add-toy-form')
const toyUrl = 'http://localhost:3000/toys'
let addToy = false

addBtn.addEventListener('click', () => {
	// hide & seek with the form
	addToy = !addToy
	if (addToy) {
		toyForm.style.display = 'block'
		realForm.addEventListener('submit', createToy)
	} else {
		toyForm.style.display = 'none'
	}
})

function addToyToHtml(toy) {
	const div = document.querySelector('#toy-collection')
	let card = document.createElement('div')
	card.className = 'card'
	card.setAttribute('data-id', toy.id)
	card.innerHTML = `<h2>${toy.name}</h2>
						<img src=${toy.image} class="toy-avatar" />
						<p>${toy.likes} Likes </p>
						<button class="like-btn">Like <3</button>`

	div.appendChild(card)
}

function getToys() {
	fetch(toyUrl)
	.then(resp => resp.json())
	.then(function(json) {
		for(i in json) {
			addToyToHtml(json[i])
		}
	})
}

function createToy(e) {
	e.preventDefault();
	let inputs = document.querySelectorAll('.input-text')
	let name = inputs[0].value
	let image = inputs[1].value

	let data = {
		name: name,
		image: image,
		likes: 0
	}

	fetch(toyUrl, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
	.then(addToyToHtml)
}

function mapInputs() {
	let mappedInputs = {likes: 0}
	for (let input of inputs) {
		mappedInputs[input.name] = input.value
		input.value = ""
	};
	return mappedInputs
}

function createNewToy(data) {
	flash = {}
	return fetch(toyUrl, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json()).then(makeToy)
}

function increaseLikes(e){
	if (e.target.className === 'like-btn') {
		let id = e.target.parentElement.dataset.id
		let like = e.target.previousElementSibling
		let likeCount = parseInt(like.innerText)
		like.innerText = `${++likeCount} likes`


		fetch(toyUrl + '/' + id, {
			method: "PATCH",
			body: JSON.stringify({likes: likeCount}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(console.log)
	}
}

document.addEventListener("DOMContentLoaded", getToys)
document.body.addEventListener('click', increaseLikes)