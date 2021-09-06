var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var pageContentE1 = document.querySelector("#page-content");
var taskIdCounter = 0;
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are emtpy strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    //Erases the given task name and type 
    formE1.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an arguement to createTaskE1
    createTaskE1(taskDataObj);
};

var createTaskE1 = function (taskDataObj) {
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //give it a class name
    taskInfoE1.className = "task-info";
    //add HTML content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);

    tasksToDoE1.appendChild(listItemE1);

    //add entire list item to list
    tasksToDoE1.appendChild(listItemE1);

    //increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    //new div element with class name of "task-actions"
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    //created edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectE1.appendChild(statusOptionE1);
    }

    return actionContainerE1;
};

formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function (event) {
    //get target element from event;
    var targetE1 = event.target;

    //edit button was clicked 
    if (targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    } 
    
    //delete button was clicked
    else if (targetE1.matches(".delete-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
   
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formE1.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event) {
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressE1.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }
};


pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);