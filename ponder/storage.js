let tasks = [];

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
}

function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`;
}

function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = tasks.map(taskTemplate).join("");
}

function newTask() {
  const taskInput = document.querySelector("#todo");
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ detail: task, completed: false });
    setLocalStorage("todos", tasks);
    renderTasks(tasks);
    taskInput.value = "";
  }
}

function removeTask(taskElement) {
  const taskText = taskElement.querySelector("p").innerText;
  tasks = tasks.filter(task => task.detail !== taskText);
  setLocalStorage("todos", tasks);
  renderTasks(tasks);
}

function completeTask(taskElement) {
  const taskText = taskElement.querySelector("p").innerText;
  const taskIndex = tasks.findIndex(task => task.detail === taskText);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    setLocalStorage("todos", tasks);
    renderTasks(tasks);
  }
}

function manageTasks(e) {
  const parent = e.target.closest("li");
  if (!parent) return;

  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  } else if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}

function setUserName() {
  const name = localStorage.getItem("todo-user");
  if (name) {
    document.querySelector(".user").innerText = name;
    document.querySelector("#user").value = name;
  }
}

function userNameHandler() {
  const nameInput = document.querySelector("#user").value.trim();
  if (nameInput) {
    localStorage.setItem("todo-user", nameInput);
    setUserName();
  }
}

function init() {
  tasks = getLocalStorage("todos");
  renderTasks(tasks);
  setUserName();
}

document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document.querySelector("#userNameButton").addEventListener("click", userNameHandler);

init();
