var taskArray = JSON.parse(localStorage.getItem('tasks'));
var input = document.getElementById('taskInput'); // Get input value
var taskList = document.querySelector('.taskList'); // Get task list container
var filterAllBtn = document.getElementById('filterAllBtn');
var filterDoneBtn = document.getElementById('filterDoneBtn');
var filterPendingBtn = document.getElementById('filterPendingBtn');

// var isFilterAll=true;
// var isFilterDone=false;
// var isFilterPending=false;
renderTasks();
function clearAll(){
    taskArray=[];
    localStorage.removeItem(tasks);
    renderTasks();
}
function newtask() {
    var input = document.getElementById('taskInput'); // Get input value
    var taskObj = {
        name: input.value, // Assign input value to task name
        done: false
    };

    taskArray = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage or initialize an empty array
    taskArray.push(taskObj); // Push task object to taskArray
    localStorage.setItem('tasks', JSON.stringify(taskArray)); // Store the updated taskArray in local storage
    input.value = ''; // Clear input field
    console.log(taskArray);
    renderTasks(); // Call the function to render tasks
}

function renderTasks() {
    filterAllBtn.className='filterBtnUnselect';
    filterDoneBtn.className='filterBtnUnselect'; 
    filterPendingBtn.className='filterBtn';
    taskList.innerHTML="";
    for(let i=0; i<taskArray.length; i++){
        console.log(i);
        if(!taskArray[i].done){
            console.log(taskArray[i]);
            var task= document.createElement('div');
            task.className="task";
            var taskName = document.createElement('span');
            taskName.innerText=taskArray[i].name;
            taskName.className='taskName';
            task.appendChild(taskName);
            addDone(taskArray[i],task);
            taskList.appendChild(task);
        }
  }
}
 
function addRemove(task,taskDiv){
    var removeBtn = document.createElement('button');
    removeBtn.innerText='❌';
    removeBtn.className='removeBtn'
    removeBtn.addEventListener('click',(event)=>{
        event.target.parentNode.remove();
        taskArray.splice(taskArray.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
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
            localStorage.setItem('tasks', JSON.stringify(taskArray));
        }
        taskDiv.appendChild(taskNameInput);
        taskDiv.appendChild(changeName);

    })
    taskDiv.appendChild(editBtn);
    
    
}

function addDone(task, taskDiv) {   //task is each js object and have name and done property
    var doneBtn = document.createElement('button');
    doneBtn.innerText = '✅';
    if(task.done) {
        doneBtn.innerText = '✔';
    }
    
    doneBtn.className = 'doneBtn';
    taskDiv.appendChild(doneBtn);
    
    doneBtn.addEventListener('click', (event) => {
        console.log(taskArray.length);
        console.log(taskArray[taskArray.indexOf(task)]);
        taskArray[taskArray.indexOf(task)].done = !taskArray[taskArray.indexOf(task)].done;
        //console.log(task.name," done : ",taskArray[task].done);
        localStorage.setItem('task', JSON.stringify(taskArray));
        var taskName = event.target.parentNode.querySelector('.taskName');
        if (task.done) {
            doneBtn.innerText = '✔';
            taskName.style.textDecoration = 'line-through';
        } else {
            doneBtn.innerText = '✅';
            taskName.style.textDecoration = 'none';
        }
        console.log(taskArray);   
        localStorage.setItem('tasks', JSON.stringify(taskArray));
        renderTasks();
    });
}
function showDone(){
    filterAllBtn.className='filterBtnUnselect';
    filterDoneBtn.className='filterBtn';
    filterPendingBtn.className='filterBtnUnselect';
    taskList.innerHTML="";
    for(let i=0; i<taskArray.length; i++){
        console.log(i);
        if(taskArray[i].done){
            console.log(taskArray[i]);
            var taskDiv= document.createElement('div');
            taskDiv.className="task";
            var taskName = document.createElement('span');
            taskName.innerText=taskArray[i].name;
            taskName.className='taskName';
            taskName.style.color = 'green';
            taskDiv.appendChild(taskName);
            addRemove(taskArray[i],taskDiv);
            taskList.appendChild(taskDiv);
            
        }
  }

}
function showAll(){
    filterAllBtn.className='filterBtn';
    filterDoneBtn.className='filterBtnUnselect';
    filterPendingBtn.className='filterBtnUnselect';
    console.log('render task called');
    taskList.innerHTML = ''; // Clear existing tasks
    taskArray.forEach(task =>{
        // console.log("task",task.name,task.done);     
            var taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            var taskName = document.createElement('span');
            taskName.className = 'taskName';
            taskName.innerText = task.name;     //task object ka name
            if(task.done){taskName.style.textDecoration = 'line-through';}
            taskDiv.appendChild(taskName);
            addDone(task,taskDiv);
            addEdit(task,taskDiv);
            addRemove(task,taskDiv);
           
            taskList.appendChild(taskDiv); // Append task to taskList container
    });
}
