// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));

    addButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTaskToLocalStorage(task);
            taskInput.value = '';
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(task);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
