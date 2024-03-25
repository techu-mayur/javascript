let tasks = []; // Array to store tasks
let deletedTasks = []; // Array to store deleted tasks
let completedTasks = []; // Array to store completed tasks
// Function to add a new task
function addTask(name, description) {
  tasks.push({ name, description, completed: false, deleted: false }); // Initialize deleted property
  renderTasks();
  saveTasksToCookies(); // Save tasks to cookies after adding
}
// Function to edit a task
function editTask(index, newName, newDescription) {
  tasks[index].name = newName;
  tasks[index].description = newDescription;
  renderTasks();
  saveTasksToCookies(); // Save tasks to cookies after editing
}
// Function to delete a task
function deleteTask(index) {
  const deletedTask = tasks.splice(index, 1)[0]; // Remove task from tasks array and store it
  deletedTasks.push(deletedTask); // Add deleted task to the deletedTasks array
  renderTasks();
  // Switch to the "Deleted Task" tab
  showTab("deletedTask");
  saveTasksToCookies(); // Save tasks and deleted tasks to cookies after deleting
}
// Function to mark a task as completed
function markAsCompleted(index) {
  const completedTask = tasks.splice(index, 1)[0]; // Remove task from tasks array and store it
  completedTask.completed = true; // Mark the task as completed
  completedTasks.push(completedTask); // Add completed task to the completedTasks array
  renderTasks();
  saveTasksToCookies(); // Save tasks and completed tasks to cookies after marking as completed
  // Switch to the "Completed Task" tab
  showTab("completedTask");
}
// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing list
  // Render tasks from tasks array
  tasks.forEach((task, index) => {
    if (!task.deleted) {
      // Only render tasks that are not deleted
      const taskItem = createTaskItem(task, index);
      taskList.appendChild(taskItem);
    }
  });
  // Render completed tasks from completedTasks array
  const completedTasksContainer = document.getElementById(
    "completedTasksContainer"
  );
  completedTasksContainer.innerHTML = ""; // Clear existing completed tasks
  completedTasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index, true);
    completedTasksContainer.appendChild(taskItem);
  });
  // Render deleted tasks from deletedTasks array
  const deletedTaskAccordion = document.getElementById("deletedTaskAccordion");
  deletedTaskAccordion.innerHTML = ""; // Clear existing list
  deletedTasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index, true); // Pass true as the third argument to indicate a deleted task
    deletedTaskAccordion.appendChild(taskItem);
  });
}
// Function to create task item
function createTaskItem(task, index, isDeleted = false) {
  const taskItem = document.createElement("div");
  taskItem.className = "accordion-item";
  taskItem.innerHTML = `
    <h2 class="accordion-header">
      <button class="accordion-button ${
        isDeleted ? "" : "collapsed"
      }" type="button" data-bs-toggle="collapse" data-bs-target="#task-${index}">
        ${task.name}
      </button>
      <div class="tasklist-button">
        ${
          isDeleted
            ? ""
            : `
          <button onclick="editTaskModal(${index})" data-bs-toggle="modal" data-bs-target="#AddTask" data-bs-dismiss="modal" data-bs-backdrop="static" aria-label="Edit Task">
            <i class="fas fa-file-pen"></i>
          </button>
          <button onclick="deleteTask(${index})" aria-label="Delete Task">
            <i class="fas fa-trash"></i>
          </button>
          <button onclick="markAsCompleted(${index})" aria-label="Mark as Completed">
            <i class="fas fa-square-check"></i>
          </button>
        `
        }
      </div>
    </h2>
    <div id="task-${index}" class="accordion-collapse collapse ${
    isDeleted ? "" : ""
  }" data-bs-parent="#taskList">
      <div class="accordion-body">
        ${task.description}
      </div>
    </div>`;
  // Add event listener to the accordion button
  const accordionButton = taskItem.querySelector(".accordion-button");
  accordionButton.addEventListener("click", function () {
    const accordionCollapseItems = document.querySelectorAll(
      ".accordion-collapse"
    );
    const targetCollapse = taskItem.querySelector(".accordion-collapse");
    // Close all accordion items except the one associated with the clicked button
    accordionCollapseItems.forEach((item) => {
      if (item !== targetCollapse && item.classList.contains("show")) {
        item.classList.remove("show");
      }
    });
  });
  return taskItem;
}
// Function to initialize modal for adding/editing tasks
function editTaskModal(index) {
  const task = tasks[index];
  document.getElementById("task-name").value = task.name;
  tinymce.get("task-description").setContent(task.description); // Set content in TinyMCE editor
  const addNewTaskButton = document.getElementById("addNewTaskButton");
  addNewTaskButton.innerText = "Edit Task";
  addNewTaskButton.dataset.index = index;
}
// Function to add or edit a task
function addTaskOrEdit() {
  const name = document.getElementById("task-name").value;
  const description = tinymce.get("task-description").getContent(); // Retrieve description from TinyMCE
  console.log("Name:", name); // Log name
  console.log("Description:", description); // Log description
  const addNewTaskButton = document.getElementById("addNewTaskButton");
  if (addNewTaskButton.innerText === "Add New Task") {
    addTask(name, description);
  } else {
    const index = parseInt(addNewTaskButton.dataset.index);
    editTask(index, name, description);
    addNewTaskButton.innerText = "Add New Task";
    delete addNewTaskButton.dataset.index;
  }
  document.getElementById("task-name").value = ""; // Clear input fields after saving
  tinymce.get("task-description").setContent(""); // Clear TinyMCE editor content
  $("#AddTask").modal("hide"); // Close modal after saving task
}
// Toggle sidebar
document.getElementById("toggleButton").addEventListener("click", function () {
  const sidebar = document.querySelector(".to-do-sidebar");
  sidebar.classList.toggle("sidebar-closed");
});
// Show tab functionality
function showTab(tabName) {
  console.log("Switching to tab:", tabName); // Log the tab name for debugging
  // Hide all tab content
  var tabs = document.querySelectorAll(".task-list-content");
  tabs.forEach(function (tab) {
    tab.style.display = "none";
  });
  // Show the selected tab
  var selectedTab = document.getElementById(tabName + "ListContent");
  if (selectedTab) {
    selectedTab.style.display = "block";
  } else {
    console.log("Tab content not found for:", tabName); // Log if tab content not found
  }
}
// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
// Initialize TinyMCE with all available free options
tinymce.init({
  selector: "#task-description",
  mobile: {
    menubar: true,
  },
  plugins:
    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
});
// Function to save tasks to cookies
function saveTasksToCookies() {
  document.cookie =
    "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/";
  document.cookie =
    "completedTasks=" +
    encodeURIComponent(JSON.stringify(completedTasks)) +
    ";path=/"; // Save completed tasks to cookies
  document.cookie =
    "deletedTasks=" +
    encodeURIComponent(JSON.stringify(deletedTasks)) +
    ";path=/";
}
// Function to load tasks from cookies
function loadTasksFromCookies() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "tasks") {
      tasks = JSON.parse(decodeURIComponent(value)); // Decode URI component
    } else if (name === "completedTasks") {
      // Load completed tasks
      completedTasks = JSON.parse(decodeURIComponent(value));
    } else if (name === "deletedTasks") {
      deletedTasks = JSON.parse(decodeURIComponent(value)); // Load deleted tasks
    }
  }
  renderTasks(); // Re-render tasks after loading from cookies
}
// Render tasks on page load
document.addEventListener("DOMContentLoaded", function () {
  showTab("task");
  loadTasksFromCookies(); // Load tasks from cookies
});
// Function to filter tasks based on search term
function filterTasks(searchTerm) {
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderFilteredTasks(filteredTasks);
}
// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing list
  filteredTasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    taskList.appendChild(taskItem);
  });
}
// Event listener for search input field
document
  .querySelector(".search-bar input")
  .addEventListener("input", function () {
    const searchTerm = this.value.trim();
    filterTasks(searchTerm);
  });
