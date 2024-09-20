document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
        taskInput.focus();
    }
    updateTaskCounter();
});

document.getElementById('allTasks').addEventListener('click', function() {
    filterTasks('all');
});

document.getElementById('completedTasks').addEventListener('click', function() {
    filterTasks('completed');
});

document.getElementById('pendingTasks').addEventListener('click', function() {
    filterTasks('pending');
});

function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.classList.add('complete');
    completeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        taskItem.classList.toggle('completed');
        toggleTaskCompletion(taskText);
        updateTaskCounter();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function(event) {
        event.stopPropagation();
        editTask(taskItem, taskText);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        taskList.removeChild(taskItem);
        removeTask(taskText);
        updateTaskCounter();
    });

    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const taskItems = document.querySelectorAll('#taskList li');
            taskItems[taskItems.length - 1].classList.add('completed');
        }
    });
    updateTaskCounter();
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskCompletion(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskItem, oldText) {
    const newText = prompt('Edita tu tarea:', oldText);
    if (newText && newText.trim() !== '') {
        taskItem.firstChild.textContent = newText.trim();
        updateTaskText(oldText, newText.trim());
    }
}

function updateTaskText(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === oldText) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(filter) {
    const taskItems = document.querySelectorAll('#taskList li');
    taskItems.forEach(item => {
        switch (filter) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'completed':
                item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                item.style.display = !item.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

function updateTaskCounter() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasksCount').textContent = completedTasks;
}