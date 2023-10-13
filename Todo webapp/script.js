const tasks = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#input-box");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};


const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName){
        setTimeout(() => {
            error.style.display ="block";
        }, 200);
        return;
    }

    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = now.toLocaleDateString('en-US', options);


    const task = `<div class="task">
    <input type = "checkbox" class="task-check"/>
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash-can"></i>
    </button>
    <span class="task-datetime">${formattedDateTime}</span>
    </div>`;
    
    tasksContainer.insertAdjacentHTML("beforeend", task);

    // Add the task to the tasks array and store it in localStorage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            // Update the tasks array and localStorage after deletion
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -=1;
            displayCount(taskCount);
            // Update the tasks array and localStorage after deletion
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed")
            if(checkBox.checked) {
                taskCount -= 1;
            }
            else {
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};

// Load tasks from local storage on page load
window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";

    const storedTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    
    // Populate the tasksContainer with the stored tasks
    storedTasks.forEach((task) => {
        tasksContainer.insertAdjacentHTML("beforeend", task);
        taskCount += 1;
    });

    displayCount(taskCount);
};

