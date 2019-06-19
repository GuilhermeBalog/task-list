var listElement = document.querySelector('#app ul')
var inputElement = document.querySelector('#app input')
var buttonElement = document.querySelector('#app button')

var todos = JSON.parse(localStorage.getItem('todo_list')) || []

function renderTodos(){
    listElement.innerHTML = ''

    for(todo of todos){
        var todoElement = document.createElement('li')
        var todoText = document.createTextNode(todo)

        var linkElement = document.createElement('a')
        var linkText = document.createTextNode('X')

        linkElement.appendChild(linkText)
        linkElement.setAttribute('href', '#')

        var pos = todos.indexOf(todo)
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')

        todoElement.appendChild(linkElement)
        todoElement.appendChild(todoText)
        listElement.appendChild(todoElement)

        inputElement.focus()
    }
}

renderTodos()

function addTodo(){
    var todoText = inputElement.value;
    if(todoText != ''){
        todos.push(todoText)
        inputElement.value = ''
        renderTodos()
        saveToStorage()
    }
}

buttonElement.onclick = addTodo;

inputElement.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTodo()
    }
})
function deleteTodo(pos){
    todos.splice(pos, 1)
    renderTodos()
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('todo_list', JSON.stringify(todos))
}