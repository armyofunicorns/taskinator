// console.dir(window.document);
// let buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

// Declare the counter
let taskIdCounter = 0;
// Declare an array of objects
let tasks = [];

let formEl = document.querySelector("#task-form");
let pageContentEl = document.querySelector("#page-content");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");

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

    let isEdit = formEl.hasAttribute("data-task-id");
    // console.log(isEdit);

    // send it as an argument to createTaskEl
    // createTaskEl(taskDataObj);

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
        };
    
        createTaskEl(taskDataObj);
    }

};

let createTaskEl = function(taskDataObj) {
    // console.log(taskDataObj);
    // console.log(taskDataObj.status);

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

    // Updating createTaskEl() adding an id to the object
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    // console.log(tasks);

    // Save to localStorage
    saveTasks();
    // Load from localStorage
    loadTasks();
    
    let taskActionsEl = createTaskActions(taskIdCounter);
    // console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);

    // listItemEl.textContent = taskNameInput;
    // add entire list item to list
    // TEST This
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
    // console.log(targetEl);

    if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    } else if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    };
};

let deleteTask = function(taskId) {
    // console.log("This is the delete Id: " + taskId);
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // console.log(taskSelected);
    taskSelected.remove();

    // create new array to hold updated list of tasks
    let updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // Save to localStorage
    saveTasks();
};

let editTask = function(taskId) {
    // console.log("This is the edit Id: " + taskId);
    // get task list item element
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    // document.querySelector("select[name='task-type'] select.options[select.selectedIndex]").value = taskType;
    document.querySelectorAll("option:checked")[0].value;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

let completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);
    // find the matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // debugger;
    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    // debugger;

    // Save to localStorage
    saveTasks();

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
};

let taskStatusChangeHandler = function(event) {
    // console.log(event.target);
    // console.log(even.target.getAttribute("data-task-id"));
    // get the task item's id
    let taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // Save to localStorage
    saveTasks();
};

let saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

let loadTasks = function() {
    // Gets task items from localStorage.
    tasks = localStorage.getItem("tasks");
    // console.log("The array is now a string " + tasks);

    if (tasks === null) {
        tasks = [];
        return false;
    } else {
        // Converts tasks from the string format back into an array of objects.
        tasks = JSON.parse(tasks);
        // console.log("Now back to an array " + tasks);

        // Iterates through a tasks array and creates task elements on the page from it.
        for (var i = 0; i < tasks.length; i++) {
            // console.log(tasks[i]);
            tasks[i].id === taskIdCounter;
            // console.log(tasks[i].id);

            listItemEl = document.createElement("li");
            listItemEl.className = "task-item";
            listItemEl.setAttribute("data-task-id", tasks[i].id);

            taskInfoEl = document.createElement("div");
            taskInfoEl.className = "task-info";
            // Add some HTML content to div
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "  " + tasks[i].id + "</span>";

            // Append new div element
            taskInfoEl.appendChild(listItemEl);

            taskActionsEl = createTaskActions(tasks[i].id);

            taskActionsEl.appendChild(listItemEl);

            let currentIndex = listItemEl.querySelector("select[name='status-change']");
            console.log(currentIndex);
            // Check to make sure all the tasks are set to to-do
            if (tasks[i].status === "to do") {
                currentIndex = 0;
                listItemEl.appendChild(tasksToDoEl);
            } else if (tasks[i].status === "in progress") {
                currentIndex = 1;
                listItemEl.appendChild(tasksInProgressEl);
            } else {
                currentIndex = 2;
                listItemEl.appendChild(tasksCompletedEl);
            }

            // increase task counter for next unique id
            taskIdCounter++;
        };
        
    };
};

// buttonEl.addEventListener("click", function() {
//     let newTask = "Here is the new task";
//     taskFormHandler(newTask);
// });

// loadTasks();

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);