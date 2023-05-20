const main = document.getElementById('main')
const showListButton = document.getElementById('showListButton')

async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json()
    return data
}


async function showBtnClickHandler(eventTarget) {
    const loader = document.querySelector('.rocket-loader')
    loader.style.display = 'inherit'
    const todos = await getTodos()
    const ul = document.createElement('ul')
    ul.classList.add('list')

    todos.forEach((element) => {
        const li = document.createElement('li')
        const liButton = document.createElement('button')
        const text = document.createElement('p')
        text.setAttribute('data-item-id', element.id)
        
        text.classList.add('text')
        liButton.classList.add('liButton')
        li.classList.add('listItem')
        text.innerText = element.title;

        liButton.addEventListener('click', changeStatus)
        text.addEventListener('click', changeTodo)
        text.addEventListener("mouseover", () => {
            li.style.cursor = 'pointer'
        })

        function changeTodo () {
            const liHover = document.querySelector('.changeTodo')
            liHover.style.display = 'inherit'
            liHover.querySelector('button').setAttribute('data-item-id', element.id)
        }
        
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
    
    const addTodo = () => {
        const inputText = document.querySelector('.add-block input').value
        const li = document.createElement('li')
        const liButton = document.createElement('button')
        const text = document.createElement('p')
        const list = document.querySelector('.main .list')
        text.classList.add('text')
        liButton.classList.add('liButton')
        li.classList.add('listItem')
        text.innerText = inputText;
        li.classList.add('not_completed')
        liButton.innerText = 'not completed!'
        liButton.addEventListener('click', changeStatus)
        li.appendChild(text)
        li.appendChild(liButton)
        list.appendChild(li)
        document.querySelector('.add-block input').value = ''
    }
    

    document.querySelector('.add-block button').addEventListener('click', addTodo)

    main.appendChild(ul)
    document.body.removeChild(loader)

    showListButton.disabled = true

    const manipulationBlock = document.getElementsByClassName('maninpulations-block')[0]
    manipulationBlock.classList.remove('hidden')

    document.querySelector('.search-block button').addEventListener('click', searchForTodos)

}

const searchForTodos = () => {
    let inputText = document.querySelector('.search-block input').value.toLowerCase()
    const list = document.querySelectorAll('.listItem')
    for(let item of list) {
        if(!item.innerText.toLowerCase().includes(inputText)){
            item.style.display = 'none'
        } else {
            item.style.display = 'inherit'
        }
    }
    document.querySelector('.search-block input').value = ''
}

const searchTodoButton = document.getElementsByClassName('search-todo')

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

const cancelButton = document.querySelector('.cancel')
cancelButton.addEventListener('click', cancelAction)

function cancelAction (event) {
    document.querySelector('.changeTodo').style.display = 'none'    
    event.target.previousSibling.previousSibling.previousSibling.previousElementSibling.value = ''
}

const confirmButton = document.querySelector('.confirm')
confirmButton.addEventListener('click', confirmAction)

function confirmAction (event) {
    const datasetSelector = '[data-item-id="' + event.target.dataset.itemId + '"]'
    const p = document.querySelector(`.list ${datasetSelector}`)
    p.innerText = event.target.previousSibling.previousElementSibling.value
    document.querySelector('.changeTodo').style.display = 'none'
}