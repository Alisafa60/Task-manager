//basic task managment
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskName !== "") {
        const taskItem = document.createElement('li');
        taskItem.classList.add("task-item"); 
        taskItem.innerHTML = `
        <div class="task-name"><span>${taskName}<span></div>
        <div class="task-date"><span>Due Date: ${dueDate}<span></div>
        <div class="task-priority"><span>Priority: ${priority}<span></div>
        <button class="edit-button">Edit</button>
        <button class="completed-button">Completed</button>
        <button class="delete-button">Delete</button>
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
        const taskItem = target.parentElement;
        const taskText = taskItem.querySelector("span").innerText;
        editTask(taskItem, taskText);
    } else if (target.classList.contains("completed-button")) {
        // Mark task as completed
        const task = target.parentElement;
        task.classList.add("completed");
    } else if (target.classList.contains("delete-button")) {
        // Delete task
        const task = target.parentElement;
        task.remove();
    }
});

// Function to edit a task 
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