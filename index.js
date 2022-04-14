import {saveTask, onGetTasks, deleteTask, editTask, getTak} from './firebase.js';

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById('tasks-container')

let editStatus = false;
let id ='';

window.addEventListener("DOMContentLoaded", async () => {
    
    onGetTasks((querySnapshot) => {
        
        taskContainer.innerHTML = '';
           querySnapshot.forEach((doc) => {
            
            const task = doc.data();
            
            taskContainer.innerHTML += `
            
            <div class="card card-body mt-2 border-primary" style="border-radius: 10px;">
                <h3>Tarea: ${task.title}</h3>
                <p>Descripcion: ${task.description}</p>
                <div class="displey-flex">
                    <button class ="btn btn-primary btn-delete" data-id="${doc.id}" style="border-radius: 10px;" >Delete</button>
                    <button class ="btn btn-success btn-edit" data-id="${doc.id}" style="border-radius: 10px;" >Edit</button>
                </div>
            </div>
            `
        })
        
        const btnDelete = taskContainer.querySelectorAll('.btn-delete')
        btnDelete.forEach((btn) => {

            btn.addEventListener('click', (e) => {
                deleteTask(e.target.dataset.id)
            })
        })
        const btnEdit = taskContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getTak(e.target.dataset.id)
                
                const task = doc.data()
                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description
                editStatus = true;
                id = e.target.dataset.id;
                taskForm['btn-task-form'].innerHTML = 'Edit Task'
            })
        })
    })
})  

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = taskForm["task-title"].value;
    const description = taskForm["task-description"].value;
    if (!editStatus) {
        saveTask(title, description);
        
    }else{
        editTask(id, {title, description});
        editStatus = false;
        taskForm['btn-task-form'].innerHTML = 'save'
    }  
    taskForm.reset();
});