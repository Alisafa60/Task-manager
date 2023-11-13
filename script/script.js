//basic task managment
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const completedTaskContainer = document.getElementById("completedTaskList");

//creating a task list
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const taskName = taskNameInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;
    let formattedDueDate;

    if (dueDate.trim() === "") {
        formattedDueDate = "Not specified";
    } else {
        formattedDueDate = dueDate;
    }

    if (taskName !== "") {
        const taskItem = document.createElement('li');
        taskItem.classList.add("task-item"); 
        taskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item task-name">${taskName}</span>
            <span class="task-item task-date"> ${formattedDueDate}</span>
            <span class="task-item task-priority"> ${priority}</span>   
            <button class="button-container edit-button"><i class="fas fa-edit" style="color: #b19cd8;"></i></button>
            <button class= "button-container completed-button"><i class="fas fa-tasks" style="color: #b19cd9;"></i></button>
            <button class= "button-container delete-button"><i class="fas fa-trash-alt" style="color: #b19cd8;"></i></button>
            
        </div>
        `;
        taskList.appendChild(taskItem);
        taskNameInput.value = "";
        dueDateInput.value = "";
    }
});


taskList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("edit-button")) {
        // Edit task
        const taskItem = target.closest(".task-item");
        const taskText = taskItem.querySelector(".task-name").innerText;
        editTask(taskItem, taskText);
    } else if (target.classList.contains("completed-button")) {
        // Mark task as completed
        const taskItem = target.closest(".task-item")
        taskItem.classList.add("completed");
        moveCompletedTask(taskItem);
    } else if (target.classList.contains("delete-button")) {
        // Delete task
        const task = target.closest(".task-item")
        task.remove();
    }
});

    //moving completed task to separate table
function moveCompletedTask(taskItem) {
    const taskText = taskItem.querySelector(".task-name").innerText;
    const completedTaskItem = document.createElement('li');
    completedTaskItem.classList.add("task-item", "completed-task-item");
    completedTaskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item task-name">${taskText}</span>
            <div class="button-container">
                <button class="restore-button"><i class="fas fa-undo" style="color: #b19cd8;"></i></button>
            </div>
        </div>
    `;
    completedTaskContainer.appendChild(completedTaskItem);
    taskItem.remove();
}


// editing a task 
function editTask(taskItem, taskText) {
    const taskTextSpan = taskItem.querySelector("span");
    taskTextSpan.style.display = "none";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText;
    taskItem.appendChild(editInput);

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    taskItem.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
        const editedText = editInput.value;
        if (editedText.trim() !== "") {
            taskTextSpan.innerText = editedText;
            taskTextSpan.style.display = "inline";
            editInput.remove();
            saveButton.remove();
        }
    });
    
}

    //background image
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const imagePath = "./Assets/images/background.jpg";
    body.style.backgroundImage = `url('${imagePath}')`;
});

completedTaskContainer.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("restore-button")) {
        // Restore completed task
        const completedTaskItem = target.closest(".completed-task-item");
        const taskText = completedTaskItem.querySelector(".task-name").innerText;
        restoreCompletedTask(completedTaskItem, taskText);
    }
});


function restoreCompletedTask(completedTaskItem, taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item task-name">${taskText}</span>
            <span class="task-item task-date">Completed</span>
            <div class="button-container">
                <button class="edit-button"><i class="fas fa-edit" style="color: #b19cd8;"></i></button>
                <button class="delete-button"><i class="fas fa-trash-alt" style="color: #b19cd8;"></i></button>
            </div>
        </div>
    `;
    taskList.appendChild(taskItem);
    completedTaskItem.remove();
}

const toggleButton = document.getElementById("toggleCompletedTasks");
toggleButton.addEventListener("click", function () {
    const taskListContainer = document.querySelector(".task-list-container");
    const completedTasksContainer = document.querySelector(".completed-tasks-container");

    if (taskListContainer.style.display === "none") {
        // Show task list and hide completed tasks
        taskListContainer.style.display = "block";
        completedTasksContainer.style.display = "none";
    } else {
        // Hide task list and show completed tasks
        taskListContainer.style.display = "none";
        completedTasksContainer.style.display = "block";
    }
});