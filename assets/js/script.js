// console.dir(window.document);
// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let taskFormHandler = function(event) {
    // Stops the default behavior to reload page
    event.preventDefault();

    // Capturing the values in Input and Select form fields
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    // console.dir(taskNameInput);
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Field validation
    // check if input values are empty strings
    if (!taskNameInput) {
        alert("You are missing the task title.");
        return false;
    } else if (!taskTypeInput) {
        alert("You are missing the task type.");
        return false;
    };

    formEl.reset();

    // package up data as an object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
    // Create a new li element and add a class
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create a new div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add some HTML content to div
    // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Append new div element
    listItemEl.appendChild(taskInfoEl);
    
    // listItemEl.textContent = taskNameInput;
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // Clear the field of the last input
    // document.getElementById("inputField").value = "";
    // document.getElementById("selectField").value = "";
    formEl.reset();
}

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     taskFormHandler(newTask);
// });

formEl.addEventListener("submit", taskFormHandler);