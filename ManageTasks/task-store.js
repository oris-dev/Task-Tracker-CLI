// this class takes the task object from the CLI and changes it into a JSON format, sending it into 
// the task load
import fs from "node:fs/promises";
import { loadTasks, updateTasks, getMaxID } from "./task-load.js";
const jsonPath = "./tasks.json";

export function addTask(task) {
    updateTasks(task);
}

export async function deleteTask(id) {


    const rawTasks = await loadTasks();  // returns an object array of the tasks

    //filter the tasks based 
    const updatedTasks = rawTasks.filter(task => task.id != id)
    const tasksInJSON = JSON.stringify(updatedTasks, null, 2);
    await fs.writeFile(jsonPath, tasksInJSON, "utf8");
}

export async function renameTask(id, newDescription) {

    // returns an object array of the tasks
    let rawTasks = await loadTasks();
    //change the task with the specific id, I can use the id as an index cause it 
    // always tracks the amount of tasks there is
    const index = rawTasks.findIndex(task => task.id === Number (id));

    if(index === -1) throw Error(`The task with the id of ${id} doesn't exist`);

    rawTasks[index].description = newDescription;

    const tasks = JSON.stringify(rawTasks, null, 2);
    await fs.writeFile(jsonPath, tasks, "utf8");
}

export async function list() {
    const tasks = await loadTasks(); //  go over every task and print its properties
    tasks.forEach(task => {
        if (task.status !== 'done') {
            console.log(`        Task ID: ${task.id}
        Task description: ${task.description}
        Task status: ${task.status}
        `);
        }

    });
}


export async function listByStatus(status) {
    const tasks = await loadTasks(); //  go over every task and print its properties

    // need to do a check if a task with the status above exists 


    tasks.forEach(task => {
        if (task.status === status) {
            console.log(`        Task ID: ${task.id}
        Task description: ${task.description}
        Task status: ${task.status}
        `);
        }

    });
}



