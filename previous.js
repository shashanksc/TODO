var taskArray = [];
var input = document.getElementById('taskInput'); // Get input value
var taskList = document.querySelector('.taskList'); // Get task list container
function newtask() {
    var input = document.getElementById('taskInput'); // Get input value
    
    var taskObj = {
        name: input.value, // Assign input value to task name
        done: false
    };

    var taskArray = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage or initialize an empty array
    taskArray.push(taskObj); // Push task object to taskArray

    localStorage.setItem('tasks', JSON.stringify(taskArray)); // Store the updated taskArray in local storage

    input.value = ''; // Clear input field
    console.log(taskArray);
    renderTasks(); // Call the function to render tasks
}


function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    taskArray.forEach(function(task) {
        var taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        var taskName = document.createElement('span');
        taskName.className = 'taskName';
        taskName.innerText = task.name;     //task object ka name
        if(task.done){taskName.style.textDecoration = 'line-through';}
        taskDiv.appendChild(taskName);
        addEdit(task,taskDiv);
        addRemove(task,taskDiv);
        addDone(task,taskDiv);
        taskList.appendChild(taskDiv); // Append task to taskList container

    });
}
function addRemove(task,taskDiv){
    var removeBtn = document.createElement('button');
    removeBtn.innerText='🗑️';
    removeBtn.className='removeBtn'
    removeBtn.addEventListener('click',(event)=>{
        event.target.parentNode.remove();
        taskArray.splice(taskArray.indexOf(task), 1);
    });
    taskDiv.appendChild(removeBtn);
}
function addEdit(task,taskDiv){
    var editBtn = document.createElement('button');
    editBtn.innerText='🖊️';
    editBtn.className='editBtn';
    editBtn.addEventListener('click',(event)=>{
        editBtn.disabled = true;
        var taskDiv= event.target.parentNode;
        var taskName = taskDiv.querySelector('.taskName');
        var taskNameInput = document.createElement('input');
        var changeName = document.createElement('Button');
        changeName.innerText='✔';
        changeName.className='changeBtn';
        changeName.onclick=()=>{
            task.name=taskNameInput.value;
            taskName.innerText=task.name;
            taskNameInput.remove();
            changeName.remove();
            editBtn.disabled = false;
        }
        taskDiv.appendChild(taskNameInput);
        taskDiv.appendChild(changeName);

    })
    taskDiv.appendChild(editBtn);
    
}

function addDone(task, taskDiv) {
    var doneBtn = document.createElement('button');
    doneBtn.innerText = '✅';
    if(task.done) {
        doneBtn.innerText = '❌';
    }
    
    doneBtn.className = 'doneBtn';
    taskDiv.appendChild(doneBtn);
    
    doneBtn.addEventListener('click', (event) => {
        task.done = !task.done;
        var taskName = event.target.parentNode.querySelector('.taskName');
        if (task.done) {
            doneBtn.innerText = '❌';
            taskName.style.textDecoration = 'line-through';
        } else {
            doneBtn.innerText = '✅';
            taskName.style.textDecoration = 'none';
        }
    });
}
function showDone(){
  console.log('done');
  

}
function showUndone(){
    console.log('undone');
}

