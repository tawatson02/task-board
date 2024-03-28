

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const titleInput = document.querySelector('#task-title');
const dateInput = document.querySelector('#datepicker');
const descInput = document.querySelector('#task-desc');


let tasks = [];
// Todo: create a function to generate a unique task id
function generateTaskId() {

    nextId++;
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // taskList.innerHTML= '';
    // inProgressList.innerHTML = '';
    // doneList.innerHTML = '';
    $('#todo-cards').empty();
    // let nextId = generateTaskId();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
        .attr('data-project-id', nextId);

       
        taskCard.addClass('ui-state-default')
        const title = $('<h3>').addClass('card-text').text(task.taskTitle);
        const date = $('<p>').addClass('card-text').text(task.taskDueDate);
        const desc = $('<p>').addClass('card-text').text(task.taskDescription);
        
        const del = $('<button>').addClass('btn btn-danger').text('Delete');
        del.on('click', function(){
            taskCard.remove();
            tasks.splice(i, 1);
        })
       
        taskCard.append(title)
        taskCard.append(date)
        taskCard.append(desc)
        taskCard.append(del)
        $('#todo-cards').append(taskCard)
        // taskCard.append(title, date, desc, del); 

    }

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let task = JSON.parse(localStorage.getItem('task'));
    createTaskCard(task);
}

// Todo: create a function to handle adding a new task

function handleAddTask(event) {
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
   console.log("event: ", event)
   console.log("event: ", event.target.id)
   console.log("object: ", ui)
   console.log("dataset: ", ui.draggable[0].dataset.nextId)
    console.log("this" , $(this));
   let taskId = $(this).attr('data-project-id');
   console.log("Proj ID: ", taskId);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker


  //         // Code to handle the submit button click event
//         // This is where you can perform actions like sending data to a server
//     );
       
function saveProjectsToStorage () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

    
    
    

$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
    });
});

$(function () {
    init();
    let submit = document.getElementById('theSubmit');
    submit.addEventListener('click', function(event){
        event.preventDefault();
        localStorage.setItem('tasks', JSON.stringify(tasks))

        const taskIndex = {
            taskTitle: titleInput.value.trim(),
            taskDueDate: dateInput.value.trim(),
            taskDescription: descInput.value.trim()
        };

        if (titleInput.value === ''||
            dateInput.value === '' ||
            descInput.value === '') {
            return false;
        } else {tasks.push(taskIndex)
            console.log(tasks)
            titleInput.value = '';
            dateInput.value = '';
            descInput.value = '';
        }
        

        saveProjectsToStorage ();
        createTaskCard();
        
    })

    
});
// setup our drag and drop functionality w/ jQuery
$( function() {
    $( ".draggable" ).draggable();
    $(".lane").droppable({
        accept: '.draggable',
        drop: handleDrop
    })
  } );


function init(){
    const storedTasks =JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks !== null) {
        tasks = storedTasks;
    }
    createTaskCard();
}