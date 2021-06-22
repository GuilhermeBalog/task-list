const app = document.querySelector("#app");
const listElement = document.querySelector('#app ul')
const noTasksElement = document.querySelector('.no-tasks')
const inputElement = document.querySelector('form input')
const formModal = document.querySelector('.add-task-form')
const newBtn = document.querySelector(".new-btn");
const closeBtn = document.querySelector(".close");

const itemName = '@guilhermebalog/task-list'
const tasks = JSON.parse(localStorage.getItem(itemName)) || []

renderTasks()

function saveToStorage() {
  localStorage.setItem(itemName, JSON.stringify(tasks))
}

function renderTasks() {
  listElement.innerHTML = ''
  if (tasks.length > 0) {
    noTasksElement.classList.remove('active')

    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li')

      const paragraph = document.createElement('p')
      const taskText = document.createTextNode(task.title)

      paragraph.appendChild(taskText)

      const checkTaskElement = document.createElement('button')
      const icon = document.createElement('i')

      if(task.done){
        taskElement.classList.add('done')
        icon.classList.add('fas', 'fa-check-circle')
      } else {
        icon.classList.add('far', 'fa-circle')
        icon.addEventListener('mouseover', () => {
          icon.className = ''
          icon.classList.add('fas', 'fa-check-circle')
        })
        icon.addEventListener('mouseleave', () => {
          icon.className = ''
          icon.classList.add('far', 'fa-circle')
        })
      }

      checkTaskElement.appendChild(icon)

      checkTaskElement.addEventListener('click', () => {
        toggleTodo(index)
      })

      taskElement.append(checkTaskElement, paragraph)

      listElement.appendChild(taskElement)
    })
  } else {
    noTasksElement.classList.add('active')
  }
}

function openModal() {
  formModal.classList.add("active");
  app.classList.add("blur");

  inputElement.focus()
}

function closeModal() {
  formModal.classList.remove("active");
  app.classList.remove("blur");

  inputElement.blur()
}

function toggleTodo(pos) {
  tasks[pos].done = !tasks[pos].done
  renderTasks()
  saveToStorage()
}

function deleteTodo(pos) {
  tasks.splice(pos, 1)
  renderTasks()
  saveToStorage()
}

newBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
formModal.addEventListener('submit', (e) => {
  e.preventDefault()

  const taskText = inputElement.value;

  if (taskText != '') {
    tasks.push({
      title: taskText,
      done: false
    })
    inputElement.value = ''
    renderTasks()
    saveToStorage()
  }

  closeModal()
})
