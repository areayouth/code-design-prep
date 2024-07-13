document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const prioritySelect = document.getElementById('priority');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const pointsDisplay = document.getElementById('points');

    let points = 0;

    // Load tasks from local storage
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));

    updatePoints();

    addButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (task) {
            const taskObj = { text: task, completed: false, priority };
            addTaskToDOM(taskObj);
            saveTaskToLocalStorage(taskObj);
            taskInput.value = '';
        }
    });

    function addTaskToDOM(taskObj) {
        const li = document.createElement('li');
        li.className = `priority-${taskObj.priority}`;
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${taskObj.completed ? 'checked' : ''}>
            <span class="task-text">${taskObj.text}</span>
            <button class="delete-button">Delete</button>
        `;
        if (taskObj.completed) {
            li.classList.add('completed');
            points += getPointsForPriority(taskObj.priority);
        }
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            if (taskObj.completed) {
                points -= getPointsForPriority(taskObj.priority);
            }
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskObj);
            updatePoints();
        });
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            taskObj.completed = checkbox.checked;
            li.classList.toggle('completed');
            updateTaskInLocalStorage(taskObj);
            if (taskObj.completed) {
                points += getPointsForPriority(taskObj.priority);
            } else {
                points -= getPointsForPriority(taskObj.priority);
            }
            updatePoints();
        });
        taskList.appendChild(li);
    }

    function getPointsForPriority(priority) {
        switch (priority) {
            case 'high':
                return 30;
            case 'medium':
                return 20;
            case 'low':
                return 10;
            default:
                return 0;
        }
    }

    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTaskToLocalStorage(taskObj) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(taskObj) {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex(t => t.text === taskObj.text);
        if (taskIndex > -1) {
            tasks[taskIndex] = taskObj;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskObj) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t.text !== taskObj.text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updatePoints() {
        pointsDisplay.textContent = `Points: ${points}`;
    }
});
