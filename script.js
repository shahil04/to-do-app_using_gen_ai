let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;
let chart;
let alertShown = false;
let taskIdCounter = Math.max(0, ...tasks.map(t => t.id || 0)) + 1;

function addOrUpdateTask() {
    const taskNameEl = document.getElementById("taskName");
    const descriptionEl = document.getElementById("description");
    const timeEl = document.getElementById("time");
    const dateEl = document.getElementById("date");
    
    if (!taskNameEl.value.trim()) {
        alert("Please enter a task name!");
        return;
    }
    
    const task = {
        id: editIndex === null ? taskIdCounter++ : tasks[editIndex].id,
        taskName: taskNameEl.value,
        description: descriptionEl.value,
        time: timeEl.value,
        date: dateEl.value,
        status: editIndex === null ? "Pending" : tasks[editIndex].status
    };

    if (editIndex === null) {
        tasks.push(task);
    } else {
        tasks[editIndex] = task;
        editIndex = null;
    }

    // Clear form
    taskNameEl.value = "";
    descriptionEl.value = "";
    timeEl.value = "";
    dateEl.value = "";

    saveAndRender();
}

function toggleStatus(index) {
    tasks[index].status =
        tasks[index].status === "Pending" ? "Completed" : "Pending";
    saveAndRender();
}

function editTask(index) {
    const t = tasks[index];
    document.getElementById("taskName").value = t.taskName;
    document.getElementById("description").value = t.description;
    document.getElementById("time").value = t.time;
    document.getElementById("date").value = t.date;
    editIndex = index;
    
    // Scroll to form
    document.querySelector(".form").scrollIntoView({ behavior: "smooth" });
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveAndRender();
    }
}

function filterTasks(type) {
    let filtered = [...tasks];
    const today = new Date().toISOString().split("T")[0];

    if (type === "today")
        filtered = tasks.filter(t => t.date === today);
    if (type === "completed")
        filtered = tasks.filter(t => t.status === "Completed");
    if (type === "pending")
        filtered = tasks.filter(t => t.status === "Pending");
    if (type === "all")
        filtered = tasks;

    // Clear date search when using other filters
    const searchDateInput = document.getElementById("searchDate");
    if (searchDateInput) {
        searchDateInput.value = "";
    }

    displayTasks(filtered);
}

function filterTasksByDate() {
    const searchDateInput = document.getElementById("searchDate");
    const selectedDate = searchDateInput.value;

    if (!selectedDate) {
        alert("Please select a date to search!");
        return;
    }

    const filtered = tasks.filter(t => t.date === selectedDate);
    displayTasks(filtered);
}

function clearDateFilter() {
    const searchDateInput = document.getElementById("searchDate");
    if (searchDateInput) {
        searchDateInput.value = "";
    }
    displayTasks(tasks);
}

function displayTasks(list = tasks) {
    const table = document.getElementById("taskTable");
    table.innerHTML = "";

    if (list.length === 0) {
        table.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">No tasks found. Add a task to get started!</td></tr>`;
        return;
    }

    list.forEach((task, index) => {
        // Find the actual index in the original tasks array using ID
        const actualIndex = tasks.findIndex(t => t.id === task.id);
        
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${task.taskName}</td>
            <td>${task.description || "-"}</td>
            <td>${task.time || "-"}</td>
            <td>${task.date || "-"}</td>
            <td class="${task.status === "Completed" ? "completed" : "pending"}">
                ${task.status}
            </td>
            <td>
                <button onclick="toggleStatus(${actualIndex})" title="Toggle Status">✔</button>
                <button onclick="editTask(${actualIndex})" title="Edit">✏</button>
                <button onclick="deleteTask(${actualIndex})" title="Delete">🗑</button>
            </td>
        </tr>
        `;
    });
}

// function saveAndRender() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     displayTasks();
//     updateChart();
//     checkPendingAlert();
// }

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    updateChart();
    alertShown = false;
    checkPendingAlert();
}

// function checkPendingAlert() {
//     const pending = tasks.filter(t => t.status === "Pending");
//     if (pending.length > 0) {
//         alert(`⚠ You have ${pending.length} pending tasks today!`);
//     }
// }

// let alertShown = false;

function checkPendingAlert() {
    const pendingToday = tasks.filter(t => {
        const today = new Date().toISOString().split("T")[0];
        return t.status === "Pending" && t.date === today;
    });

    if (pendingToday.length > 0 && !alertShown) {
        const bell = document.getElementById("bellSound");
        
        // Try to play bell sound if available
        if (bell) {
            bell.currentTime = 0;
            bell.play().catch(e => console.log("Audio play failed:", e));
        }

        // Popup message
        setTimeout(() => {
            alert(`🔔 Reminder!\nYou have ${pendingToday.length} pending task(s) today.`);
        }, 200);

        alertShown = true;
    }
}


function updateChart() {
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "Pending").length;

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("progressChart"), {
        type: "pie",
        data: {
            labels: ["Completed", "Pending"],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ["green", "red"]
            }]
        }
    });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    // Ensure all existing tasks have IDs
    tasks.forEach((task, index) => {
        if (!task.id) {
            task.id = taskIdCounter++;
        }
    });
    if (tasks.length > 0) {
        taskIdCounter = Math.max(...tasks.map(t => t.id)) + 1;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    displayTasks();
    updateChart();
    checkPendingAlert();
    
    // Set default date to today
    const dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }
    
    // Add event listeners for date search
    const searchDateInput = document.getElementById("searchDate");
    if (searchDateInput) {
        // Auto-search when date changes
        searchDateInput.addEventListener("change", function() {
            if (this.value) {
                filterTasksByDate();
            }
        });
        
        // Search on Enter key
        searchDateInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter" && this.value) {
                filterTasksByDate();
            }
        });
    }
});
