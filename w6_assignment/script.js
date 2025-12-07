
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set, update, remove, get , onValue} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js"; 

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Global tasks array
let tasks = [];

// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    // Add task on button click
    addBtn.addEventListener('click', addTask);
    
    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});

// Load tasks from database
function loadTasks() {
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        tasks = data ? Object.values(data) : [];
        renderTasks();
    });
}

// Add new task
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

// Toggle task completion
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

// Make functions globally accessible
window.toggleTask = toggleTask;
window.addTask = addTask;

// Render tasks to the screen
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

