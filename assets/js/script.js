// console.dir(window.document);
// let buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

// Declare the counter
let taskIdCounter = 1;

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");

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

let createTaskEl = function(taskDataObj) {
    // Create a new li element and add a class
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create a new div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // Add some HTML content to div
    // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "  " + taskIdCounter + "</span>";

    // Append new div element
    listItemEl.appendChild(taskInfoEl);
    
    let taskActionsEl = createTaskActions(taskIdCounter);
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

let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

let taskButtonHandler = function(event) {
    // console.log(event.target);
    // get target element from event
    let targetEl = event.target;
    console.log(targetEl);

    if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    } else if (targetEl.matches(".edit-btn")) {
        console.log("hellow");
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    };
};

let deleteTask = function(taskId) {
    // console.log("This is the delete Id: " + taskId);
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // console.log(taskSelected);
    taskSelected.remove();
};

let editTask = function(taskId) {
    console.log("This is the edit Id: " + taskId);
    // get task list item element
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
};

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     taskFormHandler(newTask);
// });

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);