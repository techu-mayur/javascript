// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  // Retrieve tasks from local storage
  var storedTasks = localStorage.getItem("tasks");
  // Check if there are tasks in local storage
  if (storedTasks) {
    // Parse the JSON string to get the tasks array
    var tasks = JSON.parse(storedTasks);
    // Iterate through each task and add it to the task list
    tasks.forEach(function (task) {
      addTaskToList(task.name, task.description);
    });
    // Initialize tooltips after loading tasks
    initTooltips();
  }
}
// Function to initialize tooltips
function initTooltips() {
  $('[data-bs-toggle="tooltip"]').tooltip();
}
// Function to add the task to the task list
function addTaskToList(taskName, description) {
  var taskListItem = $("<div>").addClass("task-list");
  // The rest of your addTaskToList function...
  // Initialize tooltips
  initTooltips();
}
// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  // Assuming tasks is an array that holds your task data
  var tasks = [];
  // Iterate through each task item in the task list
  $(".task-list").each(function () {
    var task = {
      name: $(this).find("h3").attr("title"),
      description: $(this).find(".description-preview").text(),
      // Add any other task properties you may have
    };
    // Push the task to the tasks array
    tasks.push(task);
  });
  // Convert tasks array to JSON and store it in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Log to check if tasks are saving properly
  console.log("Tasks saved to local storage:", tasks);
}
document.getElementById("toggleButton").addEventListener("click", function () {
  document.querySelector(".to-do-sidebar").classList.toggle("sidebar-closed");
});
jQuery(document).ready(function ($) {
  var editingTask = false;
  // Function to add the task to the task list
  function addTaskToList(taskName, description) {
    var taskListItem = $("<div>").addClass("task-list");
    var taskListContent = $("<div>").addClass("tasklist-content");
    var taskTitle = $("<h3>")
      .text(truncateTaskName(taskName, 11))
      .attr("title", taskName);
    var taskDescription = $("<p>")
      .text(description)
      .addClass("description-preview")
      .attr("data-bs-toggle", "collapse")
      .attr("href", "#collapseDescription")
      .attr("aria-expanded", "false")
      .attr("aria-controls", "collapseDescription");
    var collapseDiv = $("<div>")
      .addClass("collapse")
      .attr("id", "collapseDescription");
    collapseDiv.append($("<p>").text(description));
    taskTitle.on("click", function () {
      taskDescription.toggleClass("expanded");
    });
    taskListContent.append(taskTitle, taskDescription, collapseDiv);
    var taskListButton = $("<div>").addClass("tasklist-button");
    var editButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fas fa-file-pen"></i></button>'
    );
    var deleteButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fas fa-trash"></i></button>'
    );
    var completedButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Completed"><i class="fas fa-square-check"></i></button>'
    );
    editButton.on("click", function () {
      startEditingTask(taskListItem);
    });
    taskListButton.append(editButton, deleteButton, completedButton);
    taskListItem.append(taskListContent, taskListButton);
    $("#taskList").append(taskListItem);
    // Initialize tooltips
    initTooltips();
  }
  // Function to update the task details in the task list
  function updateTaskInList(updatedTaskName, updatedDescription) {
    var $editedTask = $(".task-list.editing");
    $editedTask.empty();
    var taskListContent = $("<div>").addClass("tasklist-content");
    var taskTitle = $("<h3>")
      .text(truncateTaskName(updatedTaskName, 11))
      .attr("title", updatedTaskName);
    var taskDescription = $("<p>")
      .text(updatedDescription)
      .addClass("description-preview")
      .attr("data-bs-toggle", "collapse")
      .attr("href", "#collapseDescription")
      .attr("aria-expanded", "false")
      .attr("aria-controls", "collapseDescription");
    var collapseDiv = $("<div>")
      .addClass("collapse")
      .attr("id", "collapseDescription");
    collapseDiv.append($("<p>").text(updatedDescription));
    taskTitle.on("click", function () {
      taskDescription.toggleClass("expanded");
    });
    taskListContent.append(taskTitle, taskDescription, collapseDiv);
    var taskListButton = $("<div>").addClass("tasklist-button");
    var editButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="fas fa-file-pen"></i></button>'
    );
    var deleteButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fas fa-trash"></i></button>'
    );
    var completedButton = $(
      '<button data-bs-toggle="tooltip" data-bs-placement="top" title="Completed"><i class="fas fa-square-check"></i></button>'
    );
    editButton.on("click", function () {
      startEditingTask($editedTask);
    });
    taskListButton.append(editButton, deleteButton, completedButton);
    $editedTask.append(taskListContent, taskListButton);
    // Initialize tooltips
    initTooltips();
    $editedTask.removeClass("editing");
  }
  // Function to start editing a task
  function startEditingTask($taskItem) {
    editingTask = true;
    $taskItem.addClass("editing");
    $("#AddTaskLabel").text("Edit Task");
    var taskName = $taskItem.find("h3").attr("title");
    var taskDescription = $taskItem.find(".description-preview").text();
    $("#task-name").val(taskName);
    $("#task-description").val(taskDescription);
    $("#AddTask").modal("show");
  }
  // Function to clear form fields
  function clearFormFields() {
    $("#task-name").val("");
    $("#task-description").val("");
  }
  // Function to truncate task name to a specified number of words
  function truncateTaskName(name, words) {
    var wordArray = name.split(" ");
    if (wordArray.length > words) {
      return wordArray.slice(0, words).join(" ") + "...";
    } else {
      return name;
    }
  }
  // Enable hover expansion
  $("#taskList").on("mouseenter", ".tasklist-content h3", function () {
    $(this).siblings(".description-preview").addClass("expanded");
  });
  $("#taskList").on("mouseleave", ".tasklist-content h3", function () {
    $(this).siblings(".description-preview").removeClass("expanded");
  });
  // Save button click event
  $("#saveTask").on("click", function () {
    var taskName = $("#task-name").val();
    var description = $("#task-description").val();
    if (description.length > 131) {
      alert("Description should be within 131 characters.");
      return;
    }
    if (editingTask) {
      updateTaskInList(taskName, description);
      editingTask = false;
    } else {
      addTaskToList(taskName, description);
    }
    // Save tasks to local storage
    saveTasksToLocalStorage();
    $("#taskList").show();
    $("#AddTask").modal("hide");
    clearFormFields();
  });
  // Load tasks from local storage at the beginning
  loadTasksFromLocalStorage();
});
