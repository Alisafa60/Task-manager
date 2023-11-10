//basic task managment
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");

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
            <span class="task-item-1 task-name">${taskName}</span>
            <span class="task-item-1 task-date">${formattedDueDate}</span>
            <span class="task-item-1 task-priority">${priority}</span>
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
        const taskText = taskItem.querySelector("span").innerText;
        editTask(taskItem, taskText);
    } else if (target.classList.contains("completed-button")) {
        // Mark task as completed
        const taskItem = target.closest(".task-item")
        taskItem.classList.add("completed");
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


// document.addEventListener("DOMContentLoaded", function () {
//     const backgroundImg = document.getElementById("backgroundImage");
//     const imagePath = "./Assets/images/background.jpg";
//     backgroundImg.style.backgroundImage = `url('${imagePath}')`;
// });
