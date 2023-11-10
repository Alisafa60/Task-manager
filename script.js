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
            <div><span class="task-item-1 task-name">${taskName}</span><div>
            <div><span class="task-item-1 task-date">Due Dute: ${formattedDueDate}</span><div>
            <div><span class="task-item-1 task-priority">Prioirty: ${priority}</span><div>
            <div class="button-container">    
                <button class="task-item-1 edit-button"><i class="fas fa-edit" style="color: #b19cd8;"></i></button>
                <button class="task-item-1 completed-button"><i class="fas fa-tasks" style="color: #b19cd9;"></i></button>
                <button class="task-item-1 delete-button"><i class="fas fa-trash-alt" style="color: #b19cd8;"></i></button>
            </div>
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

function moveCompletedTask(taskItem) {
    const taskText = taskItem.querySelector(".task-name").innerText;
    const completedTaskItem = document.createElement('li');
    completedTaskItem.classList.add("task-item", "completed-task-item");
    completedTaskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item-1 task-name">${taskText}</span>
            <div class="button-container">
                <button class="task-item-1 restore-button"><i class="fas fa-undo" style="color: #b19cd8;"></i></button>
            </div>
        </div>
    `;
    completedTaskContainer.appendChild(completedTaskItem);
    taskItem.remove();
}

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
    taskItem.classList.add("task-item", "completed"); // Add the "completed" class
    taskItem.innerHTML = `
        <div class="task-item-container">
            <span class="task-item-1 task-name">${taskText}</span>
            <span class="task-item-1 task-date">Completed</span>
            <div class="button-container">
                <button class="task-item-1 edit-button"><i class="fas fa-edit" style="color: #b19cd8;"></i></button>
                <button class="task-item-1 delete-button"><i class="fas fa-trash-alt" style="color: #b19cd8;"></i></button>
            </div>
        </div>
    `;
    completedTaskContainer.appendChild(taskItem);
    completedTaskItem.remove();
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


document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const imagePath = "./Assets/images/background.jpg";
    body.style.backgroundImage = `url('${imagePath}')`;
});
