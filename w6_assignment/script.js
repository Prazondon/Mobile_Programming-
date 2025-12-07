  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set, update, remove, get , onValue} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js"; 
  const firebaseConfig = {
    apiKey: "AIzaSyCHxCPFyfxoMBi_sJ2ky_ewO1s84gGOedA",
    authDomain: "assignment-a9857.firebaseapp.com",
    databaseURL: "https://assignment-a9857-default-rtdb.firebaseio.com",
    projectId: "assignment-a9857",
    storageBucket: "assignment-a9857.firebasestorage.app",
    messagingSenderId: "598384984198",
    appId: "1:598384984198:web:5d4b33a9948cdb818b9107",
    measurementId: "G-R1K6L4TQ9K"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let tasks = [];
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});
function loadTasks() {
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        tasks = data ? Object.values(data) : [];
        renderTasks();
    });
}
function addTask() {
    const taskName = taskInput.value.trim();
    
    if (!taskName) {
        alert('Please enter a task name');
        return;
    }
    
    const newTaskRef = push(ref(database, 'tasks'));
    set(newTaskRef, {
        name: taskName,
        completed: false,
        id: newTaskRef.key
    }).then(() => {
        taskInput.value = '';
    }).catch((error) => {
        console.error('Error adding task:', error);
    });
}
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        // If not completed yet, mark as completed
        if (!task.completed) {
            task.completed = true;
            update(ref(database, 'tasks/' + id), { completed: true })
                .then(() => {
                    console.log('Task marked as completed');
                })
                .catch((error) => console.error('Error updating task:', error));
        } else {
            // If already completed, delete from database
            remove(ref(database, 'tasks/' + id))
                .then(() => {
                    console.log('Task deleted from database');
                })
                .catch((error) => console.error('Error deleting task:', error));
        }
    }
}
window.toggleTask = toggleTask;
window.addTask = addTask;
function renderTasks() {
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks yet. Add one above!</li>';
        return;
    }
    
    taskList.innerHTML = tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <span class="task-text">
                ${task.name}
            </span>
            <button class="status-btn ${task.completed ? 'completed-btn' : 'pending-btn'}" onclick="toggleTask('${task.id}')">
                ${task.completed ? 'Completed' : 'Pending'}
            </button>
        </li>
    `).join('');
}

