document.addEventListener('DOMContentLoaded', function () {
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const totalCount = document.getElementById('totalCount');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    let pending = 0;
    let completed = 0;

tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = `flex items-center p-4 rounded-lg bg-gray-100 border border-gray-300 hover:border-blue  transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`;

     taskElement.innerHTML = `
         <div class="flex items-center flex-1">
            <input 
             type="checkbox" 
             ${task.completed ? 'checked' : ''}
             class="h-5 w-5 rounded border-gray-400 bg-white mr-3 task-checkbox"
             data-index="${index}">
            <span class="text-lg ${task.completed ? 'line-through' : ''}">${task.text}</span>
         </div>
         <button class=" text-2xl text-gray-500 hover:text-black ml-2 edit-btn" data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
             </svg>
        </button>
        <button class="text-gray-500 hover:text-black ml-2 delete-btn" data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg> 
        </button>                      
        `;
    taskList.appendChild(taskElement);
     if (task.completed) {
      completed++;
     } else {
     pending++;
     }
 });
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
    totalCount.textContent = tasks.length;
    }
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('task-checkbox')) {
            const index = e.target.dataset.index;
            tasks[index].completed = e.target.checked;
            renderTasks();
        }
        if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
    const btn = e.target.classList.contains('edit-btn') ? e.target : e.target.closest('.edit-btn');
    const index = btn.dataset.index;
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}
        if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
            const btn = e.target.classList.contains('delete-btn') ? e.target : e.target.closest('.delete-btn');
            const index = btn.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
        }
    });
    renderTasks();
});