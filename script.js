// Recuperation des classe par querySelector
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoOutput = document.querySelector(".todo-output");

// Ajoute un nouneau todo
const addTodo = (e) => {
    e.preventDefault();
    const todo = todoInput.value;
    if(todo) {
        const id = Date.now();
        addTodoLocalStorage({id, todo, completed: false});
        const todoItem = document.createElement("div");
        todoItem.className = `todo-item ${id}`;
        todoItem.innerHTML = `
            <input type"checkbox" class="todo-check">
            <input type"text" class="todo-text" value=${todo} disabled>
            <button class="todo-edit"><i class="fa fa-edit" style="font-size: 28px"></i></button>
            <button class="todo-delete"><i class="fa fa-trash" style="font-size: 28px"></i></button>
        `;
        todoOutput.appendChild(todoItem);
        todoInput.value = "";
    }
};

// ajouter todo dans le locale storage

const addTodoLocalStorage = (todo) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tasks) {
        tasks = [];
    }
    tasks.push(todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Fonction delete (supprimer) un todo
const deleteTodo = (e) => {
    if(e.target.className === "todo-delete") {
        deleteTodoFromLocalStorage(e.target.parentElement.classList[1]);
        e.target.parentElement.remove();
    }
};

const deleteTodoFromLocalStorage = (id) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction check (cocher) un todo
const checkedTodo = (e) => {
    if(e.target.className === "todo-check") {
        const id = e.target.parentElement.classList[1];
        const checked = e.target.checked;

        if(checked) {
            e.target.nextElementSibling.style.textDecoration = "line-through";
        }else {
            e.target.nextElementSibling.style.textDecoration = "none";
        }
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks = tasks.map(task => {
            if(task.id === parseInt(id)) {
                task.completed = checked;
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
};

//Fonction modifier un todo
const editTodo = (e) => {
    if(e.target.className === "todo-edit") {
        const id = e.target.parentElement.classList[1];
        const todoText = e.target.parentElement.querySelector(".todo-text");
        if(todoText.disabled) {
            todoText.disabled = false;
            e.target.textContent = "Save"
        } else {
            todoText.disabled = true;
            e.target.textContent = "Edit";
            editTodoInLocalStorage(id, todoText.value)
        }
    }
};
 const editTodoInLocalStorage = (id, todo) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => { 
        if(task.id === parseInt(id)) {
            task.todo = todo;
        }
        return task;
    });
 }

// fonction get todo (recuperer)
const getTodo = (e) => {
    let tasks = localStorage.getItem("tasks");
    if(!tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach((tasks) => {
            const todoItem = document.createElement("div");
            todoItem.className = `todo-item ${tasks.id}`;
            todoItem.innerHTML = `
                <input type"checkbox" class="todo-check" ${tasks.completed ? "checked": ""}>
                <input type"text" class="todo-text" ${tasks.completed ? "stike": ""} value=${tasks.todo} disabled>
                <button class="todo-edit">Edit</button>
                <button class="todo-delete">Delete</button>
            `;
            todoOutput.appendChild(todoItem);
        });
    }
};

// liste des evenements
todoForm.addEventListener("submit", addTodo);
todoOutput.addEventListener("click", deleteTodo);
todoOutput.addEventListener("click", checkedTodo);
todoOutput.addEventListener("click", editTodo);
document.addEventListener("DOMContentLoaded", getTodo);

