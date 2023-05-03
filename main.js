const main = document.getElementById('main')
const showListButton = document.getElementById('showListButton')

async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json()
    return data
}

const createLoader = () => {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    loader.innerText = 'Loading...'
    return loader
}


async function showBtnClickHandler() {
    const loader = createLoader()
    document.body.appendChild(loader)

    const todos = await getTodos()
    const ul = document.createElement('ul')
    ul.classList.add('list')

    todos.forEach((element) => {
        const li = document.createElement('li')
        const liButton = document.createElement('button')
        const text = document.createElement('p')
        
        text.classList.add('text')
        liButton.classList.add('liButton')
        li.classList.add('listItem')
        text.innerText = element.title;

        liButton.addEventListener('click', changeStatus)

        li.appendChild(text)
        li.appendChild(liButton)
        ul.appendChild(li) 

        if(element.completed) {
            li.classList.add('completed')
            text.classList.add('completed_text')
            text.nextSibling.innerText = 'completed!'
        } else {
            li.classList.add('not_completed')
            text.classList.add('not_completed_text')
            text.nextSibling.innerText = 'not completed!'
        }      
    });

    main.appendChild(ul)
    document.body.removeChild(loader)

    showListButton.disabled = true

    const manipulationBlock = document.getElementsByClassName('maninpulations-block')[0]
    manipulationBlock.classList.remove('hidden')

    document.querySelector('.add-block button').addEventListener('click', addTodo)

    document.querySelector('.search-block button').addEventListener('click', searchForTodos)
}

const addTodo = () => {
    const inputText = document.querySelector('.add-block input').value
    const li = document.createElement('li')
    const liButton = document.createElement('button')
    const text = document.createElement('p')
    text.classList.add('text')
    liButton.classList.add('liButton')
    li.classList.add('listItem')
    text.innerText = inputText;
    li.classList.add('not_completed')
    liButton.innerText = 'not completed!'
    liButton.addEventListener('click', changeStatus)
    // add new todo on top of all todos ------------------------------------------ NOT COMPLETED

    li.appendChild(text)
    li.appendChild(liButton)
    document.querySelector('.list').appendChild(li)
    document.querySelector('.add-block input').value = ''
}

const searchForTodos = () => {
    let inputText = document.querySelector('.search-block input').value.toLowerCase()
    const list = document.querySelectorAll('.listItem')
    for(let item of list) {
        if(!item.innerText.toLowerCase().includes(inputText)){
            item.style.display = 'none'
        }
    }
    document.querySelector('.search-block input').value = ''
}



showListButton.addEventListener('click', showBtnClickHandler)

function changeStatus(e) {
    const { target } = e
    const { classList } = target.parentElement
    if(classList.contains('not_completed')) {
        classList.remove('not_completed')
        classList.add('completed')
        target.innerText = 'completed!'
    } else {
        classList.remove('completed')
        classList.add('not_completed')
        target.innerText = 'not completed!'
    }
}