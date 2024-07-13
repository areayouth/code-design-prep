document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const prioritySelect = document.getElementById('priority');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const creditsDisplay = document.getElementById('credits');
    const spriteDisplay = document.getElementById('sprite');
    const titleDisplay = document.getElementById('title');
    const progressDisplay = document.getElementById('progress');
    const recurringCheckbox = document.getElementById('recurring-task');
    const storeButtons = {
        low: document.getElementById('power-up-low'),
        medium: document.getElementById('power-up-medium'),
        high: document.getElementById('power-up-high')
    };

    let credits = 0;
    let powerUps = { low: 1, medium: 1, high: 1 };

    const levels = [
        { points: 0, sprite: '🔮', title: 'Apprentice' },
        { points: 50, sprite: '🧙‍♂️', title: 'Sorcerer' },
        { points: 150, sprite: '🧚‍♀️', title: 'Enchanter' },
        { points: 300, sprite: '🐉', title: 'Dragon Master' },
        { points: 500, sprite: '🌟', title: 'Archmage' }
    ];

    // Load tasks from local storage
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));

    updateCredits();
    updateLevel();

    addButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        const priority = prioritySelect.value;
        const recurring = recurringCheckbox.checked;
        if (task) {
            const taskObj = { text: task, completed: false, priority, recurring };
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
            credits += getCreditsForPriority(taskObj.priority);
        }
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            if (taskObj.completed) {
                credits -= getCreditsForPriority(taskObj.priority);
            }
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskObj);
            updateCredits();
            updateLevel();
        });
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            taskObj.completed = checkbox.checked;
            li.classList.toggle('completed');
            updateTaskInLocalStorage(taskObj);
            if (taskObj.completed) {
                credits += getCreditsForPriority(taskObj.priority);
            } else {
                credits -= getCreditsForPriority(taskObj.priority);
            }
            updateCredits();
            updateLevel();
        });
        taskList.appendChild(li);
    }

    function getCreditsForPriority(priority) {
        switch (priority) {
            case 'high':
                return 30 * powerUps.high;
            case 'medium':
                return 20 * powerUps.medium;
            case 'low':
                return 10 * powerUps.low;
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

    function updateCredits() {
        creditsDisplay.textContent = `Credits: ${credits}`;
    }

    function updateLevel() {
        const currentLevel = levels.slice().reverse().find(level => credits >= level.points);
        spriteDisplay.textContent = currentLevel.sprite;
        titleDisplay.textContent = currentLevel.title;
        const nextLevel = levels.find(level => credits < level.points);
        if (nextLevel) {
            progressDisplay.textContent = `Credits to next level: ${nextLevel.points - credits}`;
        } else {
            progressDisplay.textContent = 'Max Level Reached!';
        }
    }

    function buyPowerUp(priority) {
        let cost;
        switch (priority) {
            case 'low':
                cost = 10;
                break;
            case 'medium':
                cost = 20;
                break;
            case 'high':
                cost = 30;
                break;
        }
        if (credits >= cost) {
            credits -= cost;
            powerUps[priority] += 1;
            updateCredits();
        } else {
            alert('Not enough credits!');
        }
    }

    storeButtons.low.addEventListener('click', () => buyPowerUp('low'));
    storeButtons.medium.addEventListener('click', () => buyPowerUp('medium'));
    storeButtons.high.addEventListener('click', () => buyPowerUp('high'));

    // Handle recurring tasks
    function handleRecurringTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => {
            if (task.recurring && task.completed) {
                task.completed = false;
                updateTaskInLocalStorage(task);
                document.querySelectorAll('.task-checkbox').forEach(checkbox => {
                    if (checkbox.nextElementSibling.textContent === task.text) {
                        checkbox.checked = false;
                        checkbox.parentElement.classList.remove('completed');
                    }
                });
            }
        });
    }

    setInterval(handleRecurringTasks, 24 * 60 * 60 * 1000); // Reset recurring tasks every 24 hours
});
