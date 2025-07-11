document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "done" : "";

      li.innerHTML = `
        <label class="checkbox-wrapper">
          <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
          <span class="task-text">${task.text}</span>
        </label>
        <div class="task-actions">
          <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;

      li.querySelector(".task-checkbox").addEventListener("change", (e) => {
        tasks[index].completed = e.target.checked;
        saveTasks();
        renderTasks();
      });

      li.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
          tasks[index].text = newText.trim();
          saveTasks();
          renderTasks();
        }
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  };

  document.querySelector(".input-area").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      tasks.push({ text, completed: false });
      input.value = "";
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
