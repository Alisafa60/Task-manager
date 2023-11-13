//basic task managment
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const completedTaskContainer = document.getElementById("completedTaskList");
const toggleButton = document.getElementById("toggleCompletedTasks");

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
        const taskName = taskItem.querySelector(".task-name").innerText;
        const dueDate = taskItem.querySelector(".task-date").innerText;
        const priority = taskItem.querySelector(".task-priority").innerText;
        taskItem.classList.add("completed");
        moveCompletedTask(taskItem, taskName, dueDate, priority);
    } else if (target.classList.contains("delete-button")) {
        // Delete task
        const task = target.closest(".task-item")
        task.remove();
    }
});

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

    //moving completed task to separate list
function moveCompletedTask(taskItem, taskText, taskDate, taskPriority) {
    const completedTaskItem = document.createElement('li');
    completedTaskItem.classList.add("task-item", "completed-task-item");
    completedTaskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item task-name">${taskText}</span>
            <span class="task-item task-date">${taskDate}</span>
            <span class="task-item task-priority">${taskPriority}</span>
            <div class="button-container">
                <button class="restore-button"><i class="fas fa-undo" style="color: #b19cd8;"></i></button>
            </div>
        </div>
    `;
    completedTaskContainer.appendChild(completedTaskItem);
    taskItem.remove();
}


completedTaskContainer.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("restore-button")) {
        // restore completed task
        const completedTaskItem = target.closest(".completed-task-item");
        const taskText = completedTaskItem.querySelector(".task-name").innerText;
        const taskDate = completedTaskItem.querySelector(".task-date").innerText;
        const taskPriority = completedTaskItem.querySelector(".task-priority").innerText;

        restoreCompletedTask(completedTaskItem, taskText, taskDate, taskPriority);
    }
});


//restoring function
function restoreCompletedTask(completedTaskItem, taskText, taskDate, taskPriority) {
    const taskItem = document.createElement('li');
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item task-name">${taskText}</span>
            <span class="task-item task-date">${taskDate}</span>
            <span class="task-item task-priority">${taskPriority}</span>
            <button class="button-container edit-button"><i class="fas fa-edit" style="color: #b19cd8;"></i></button>
            <button class="button-container completed-button"><i class="fas fa-tasks" style="color: #b19cd9;"></i></button>
            <button class="button-container delete-button"><i class="fas fa-trash-alt" style="color: #b19cd8;"></i></button>
        </div>
    `;
    taskList.appendChild(taskItem);
    completedTaskItem.remove();
}

toggleButton.addEventListener("click", function () {
    const taskListContainer = document.querySelector(".task-list-container");
    const completedTasksContainer = document.querySelector(".completed-tasks-container");

    if (taskListContainer.style.display === "none") {
        // hide completed list and show task list
        taskListContainer.style.display = "block";
        completedTasksContainer.style.display = "none";
    } else {
        // hide task list and show completed tasks
        taskListContainer.style.display = "none";
        completedTasksContainer.style.display = "block";
    }
});


//background image
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const imagePath = "./Assets/images/background.jpg";
    body.style.backgroundImage = `url('${imagePath}')`;
});