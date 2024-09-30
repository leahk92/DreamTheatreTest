const todoForm = document.querySelector(".todo-write");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector("#todo input");

let toDos = [];
const TODOS_KEY = "todos";

function saveList() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteList(event) {
    const li = event.target.parentElement.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveList();
}

function showList(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id; //
    const span = document.createElement("span");
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.src = './img/check_mint.png';
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
    button.appendChild(img);
    span.innerText = newTodo.text;
    button.addEventListener("click", deleteList);
}

function submitTodo(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    showList(newTodoObj);
    saveList();
}
todoForm.addEventListener("submit", submitTodo);

const savedTodos = localStorage.getItem(TODOS_KEY);
if(savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(showList);
}
