// console.dir(window.document);

var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(taskTitle) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = taskTitle;
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", function() {
    let newTask = "Here is the new task";
    createTaskHandler(newTask);
});

// buttonEl.addEventListener("click", createTaskHandler);