// console.dir(window.document);
// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    // Stops the default behavior to reload page
    event.preventDefault();

    // Capturing the values in Input and Select form fields
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    console.dir(taskNameInput);
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create a new li element and add a class
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create a new div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add some HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    // Append new div element
    listItemEl.appendChild(taskInfoEl);
    
    // listItemEl.textContent = taskNameInput;
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // Clear the field of the last input
    document.getElementById("inputField").value = "";
    document.getElementById("selectField").value = "";
    
};

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     createTaskHandler(newTask);
// });

formEl.addEventListener("submit", createTaskHandler);