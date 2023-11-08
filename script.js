//basic task managment
const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("task-list")

let add_btn = document.getElementById("add-button")

//create a new task item
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();  
    const taskName = taskInput.value.trim();
    
    if (taskName !== ""){
        const taskItem = document.createElement('li');
        taskItem.innerHTML= `
        <span>${taskName}</span>
        <button class="edit-button">Edit</button>
        <button class="completed-button">Completed</button>
        <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";

    }
});

//task deletion and completion
taskList.addEventListener("click", function(e){
    const target = e.target;
    if(target.classList.contains("delete-button")){
        taskList.remove();
    }
    else if(target.classList.ceontain("complete-button")){
        const task = target.parentElement;
        task.classList.add("completed");
    }
})






    
