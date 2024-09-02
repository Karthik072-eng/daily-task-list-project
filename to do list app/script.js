// script.js

// Clock and Date Functionality
function updateClock() {
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  const now = new Date();

  clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dateElement.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

setInterval(updateClock, 1000);
updateClock();

// Task Management
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
      <div class="task-details">
        <h3>${task.name}</h3>
        <p>${task.date} at ${task.time}</p>
      </div>
      <div class="task-actions">
        <button onclick="editTask(${index})">&#9998;</button>
        <button onclick="deleteTask(${index})">&#10060;</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskName = document.getElementById('task-input').value.trim();
  const taskDate = document.getElementById('task-date').value;
  const taskTime = document.getElementById('task-time').value;

  if (taskName && taskDate && taskTime) {
    tasks.push({ name: taskName, date: taskDate, time: taskTime });
    saveTasks();
    renderTasks();
    taskForm.reset();
  }
});

function editTask(index) {
  const task = tasks[index];

  document.getElementById('task-input').value = task.name;
  document.getElementById('task-date').value = task.date;
  document.getElementById('task-time').value = task.time;

  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
