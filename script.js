
let playerXP = 0;
let playerLevel = 1;
let requiredXP = 100;

function updateLevel() {
  while (playerXP >= requiredXP) {
    playerLevel++;
    playerXP -= requiredXP;
    requiredXP = Math.floor(requiredXP * 1.5);
  }
  
  document.getElementById('playerLevel').textContent = playerLevel;
  document.getElementById('currentXP').textContent = playerXP;
  document.getElementById('requiredXP').textContent = requiredXP;
  document.getElementById('levelProgress').style.width = (playerXP / requiredXP * 100) + '%';
}

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  
  if (task) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    
    li.innerHTML = `
      <span onclick="toggleComplete(this)">
        <input type="checkbox" onclick="event.stopPropagation()">
        ${task}
      </span>
      <button onclick="deleteTask(this)">Delete</button>
    `;
    
    list.appendChild(li);
    input.value = '';
  }
}

function toggleComplete(element) {
  const checkbox = element.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  element.classList.toggle('completed');
  
  if (element.classList.contains('completed')) {
    playerXP += 25;
    updateLevel();
    moveToCompleted(element.textContent.trim());
  }
}

function moveToCompleted(taskText) {
  const completedList = document.getElementById('completedList');
  const li = document.createElement('li');
  li.innerHTML = `
    ${taskText}
    <button onclick="deleteTask(this)">Delete</button>
  `;
  completedList.appendChild(li);
}

function deleteTask(button) {
  button.parentElement.remove();
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

updateLevel();
