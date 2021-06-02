// console.dir(window.document);
// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

// Declare the counter
var taskIdCounter = 1;

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create a new div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add some HTML content to div
    // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "  " + taskIdCounter + "</span>";

    // Append new div element
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    // console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);

    // listItemEl.textContent = taskNameInput;
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

    // Clear the field of the last input
    // document.getElementById("inputField").value = "";
    // document.getElementById("selectField").value = "";
    formEl.reset();
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     taskFormHandler(newTask);
// });

formEl.addEventListener("submit", taskFormHandler);