// script.js

document.addEventListener("DOMContentLoaded", () => {
  const tasksList = document.getElementById("tasks");
  const newTaskInput = document.getElementById("new-task");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");
  const notesInput = document.getElementById("notes");
  const addTaskButton = document.getElementById("add-task");
  const priorityFilter = document.getElementById("priority-filter");
  const completedFilter = document.getElementById("completed-filter");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const currentMode = document.body.classList.contains("dark-mode")
      ? "enabled"
      : "disabled";
    localStorage.setItem("darkMode", currentMode);
  }
  function toggleTaskCompletion(index) {
    tasks[index][4] = !tasks[index][4];
    saveTasks();
    renderTasks();

    const taskElements = document.querySelectorAll(".task");
    taskElements[index].style.backgroundColor = tasks[index][4]
      ? "#d4edda"
      : "#f9f9f9";
  }

  function renderTasks() {
    tasksList.innerHTML = "";
    const selectedPriority = priorityFilter.value;
    const selectedCompleted = completedFilter.value;

    tasks.forEach((task, index) => {
      const [
        taskText,
        taskPriority,
        taskDueDate,
        taskNotes,
        taskCompleted,
        isEditing,
      ] = task;

      if (
        (selectedPriority === "all" || selectedPriority === taskPriority) &&
        (selectedCompleted === "all" ||
          (selectedCompleted === "true" && taskCompleted) ||
          (selectedCompleted === "false" && !taskCompleted))
      ) {
        const li = document.createElement("li");
        li.classList.add("task");
        if (isEditing) {
          li.classList.add("editing");
        }
        if (taskCompleted) {
          li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-content">
              <div class="task-details">
                ${
                  isEditing
                    ? `<input class="edit-task-name" value="${taskText}">`
                    : `<span class="task-name">${taskText}</span>`
                }
                
              </div>
              ${
                isEditing
                  ? `<textarea class="edit-task-notes">${taskNotes}</textarea>`
                  : `<span class="task-notes">${taskNotes}</span>`
              }
              <div class="task-actions">
                <span class="priority ${taskPriority}">${taskPriority}</span>
                <span class="due-date">${taskDueDate || "No Due Date"}</span>
                ${
                  isEditing
                    ? `<button class="save-task" data-index="${index}">Save</button>`
                    : `<button class="edit-task" data-index="${index}">Edit</button>`
                }
                <button class="delete-task" data-index="${index}">Delete</button>
                <button class="complete-task" data-index="${index}">${
          taskCompleted ? "Completed" : "Complete"
        }</button>
              </div>
            </div>
          `;
        tasksList.appendChild(li);

        if (isEditing) {
          li.querySelector(".edit-task-name").focus();
        }
      }
    });
  }

  renderTasks();

  function addTask() {
    const taskText = newTaskInput.value;
    if (taskText.trim() === "") return;
    const taskPriority = prioritySelect.value;
    const taskDueDate = dueDateInput.value;
    const taskNotes = notesInput.value;
    const taskCompleted = false;
    tasks.push([
      taskText,
      taskPriority,
      taskDueDate,
      taskNotes,
      taskCompleted,
      false,
    ]);
    saveTasks();
    newTaskInput.value = "";
    prioritySelect.value = "high";
    dueDateInput.value = "";
    notesInput.value = "";
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function toggleTaskCompletion(index) {
    tasks[index][4] = !tasks[index][4];
    saveTasks();
    renderTasks();
  }

  function editTask(index) {
    tasks[index][5] = true;
    renderTasks();
  }

  function saveEditedTask(index) {
    const taskText = tasksList.querySelector(".edit-task-name").value;
    const taskNotes = tasksList.querySelector(".edit-task-notes").value;
    tasks[index][0] = taskText;
    tasks[index][3] = taskNotes;
    tasks[index][5] = false;
    saveTasks();
    renderTasks();
  }

  priorityFilter.addEventListener("change", renderTasks);
  completedFilter.addEventListener("change", renderTasks);

  tasksList.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("delete-task")) {
      deleteTask(index);
    } else if (e.target.classList.contains("complete-task")) {
      toggleTaskCompletion(index);
    } else if (e.target.classList.contains("edit-task")) {
      editTask(index);
    } else if (e.target.classList.contains("save-task")) {
      saveEditedTask(index);
    }
  });

  addTaskButton.addEventListener("click", addTask);

  darkModeToggle.addEventListener("click", toggleDarkMode);
});
