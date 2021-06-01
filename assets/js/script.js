// console.dir(window.document);

// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    // Stops the default behavior to reload page
    event.preventDefault();

    let newTaskContent = document.querySelector("#task-form").textContent;
    console.log(newTaskContent);

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = newTaskContent;
    tasksToDoEl.appendChild(listItemEl);
};

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     createTaskHandler(newTask);
// });

formEl.addEventListener("submit", createTaskHandler);