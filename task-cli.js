import fs from "node:fs";
import { loadTasks, updateTasks, getMaxID } from "./task-load.js";
import * as task from "./task-store.js";
const maxDescLength = 100;

cliConvos();


async function cliConvos() {

    const funcWord = process.argv[2]; 
    const maxID = await getMaxID(); // find max ID
    switch (funcWord) {

        //usage: add <description> - adds a task with the following description
        case 'add':
            // creates a description
            let description = process.argv.filter((value, index) => {
                if (index > 2)
                    return value;

            });

            if (testLength(description, maxDescLength)) {
                const condensedDesc = description.join(' '); // make sure the description is one string and not seperate args
                const newTask = createTask(condensedDesc, maxID + 1);
                try {
                    await task.addTask(newTask);// need to use await cause changing the JSON
                    console.log(`A task with the id of ${maxID + 1} has been successfully added`);
                }

                catch (e) {
                    console.log("Couldn't add your task: ", e);
                }


            } else {
                console.log("invalid description");
                break;
            }




            break;

        // usage: rename <id> <newname> - rename an existing task
        case 'rename':

            const renameID = process.argv[3];

             let renameDescription = process.argv.filter((value, index) => {
                if (index > 3)
                    return value;

            });

             renameDescription = renameDescription.join(' ');

            if(renameDescription === ""){
                console.log("A task description must not be empty");
                break;
            }
            
             if(!isDigits(renameID)){
               console.log("Task ID must be only written in numbers");
               break;
            }

            if(! (await taskExists(renameID))){
                console.log("Task doesn't exist");
                break;
            }

            task.renameTask(renameID, renameDescription);
            
            break;

        //usage: delete <id>
        case 'delete':
                
            if(!isDigits(process.argv[3])){
               console.log("Task ID must be only written in numbers");
               break;
            }


            const id = Number(process.argv[3]); // convert id to a number 


            if(!(await taskExists(id))){
                console.log(`The task with the id of ${id} doesn't exist.`)
                break;
            }

            if (process.argv.length > 4) {
                console.log("Incorrect usage - please write: node ./task-cli.js delete <id>");
                break;
            }

            try {
                await task.deleteTask(id);
                console.log(`Succsessfully deleted task ${id}`)
            } catch (e) {
                console.log(`Couldnt remove the task with the id of ${id} `, e);
            }


            break;


        // usage: list - lists all the tasks which are not 'done'
        case 'list':
            
            task.list();
            
            break;

        //usage: listByStatus <status> - lists all the items in the status mentioned
        case 'listByStatus':
            const status = process.argv[3]; // make sure the status is a string
            const exists = await statusExists(status);

            if(!validateStatus(status)){
                console.log("Please write a valid status: [1] to-do [2] in-progress [3] done");
                break;
            }

            if(!exists){
                console.log(`There are no tasks created with the status ${status}`);
                break;
            }

            task.listByStatus(status);

            break;

        case 'test':

            const newTask = createTask("chomp chomp", maxID + 1);
            updateTasks(newTask);
            break;


        default:
            console.log(new Error("Please enter a valid command"));
            break;


    }

}


// status , createdAt , updatedAt
function createTask(desc, id) {
    const now = new Date().toDateString();
    return { id: id, description: desc, status: 'to-do', createdAt: now, updatedAt: now };
}

function testLength(variable, maxLength) {
    if (variable.length > 0 && variable.length < maxLength)
        return true;


    return false;
}

async function taskExists(taskID) {

    const tasksArray = await loadTasks();

    if (tasksArray.some(task => task.id === Number(taskID)))
        return true;
 
    return false;
}

async function statusExists(status){
    const array = await loadTasks();
    return (array.some(task => task.status === status));
}

function validateStatus(status){
    return (status === 'to-do' || status === 'done' || status === 'in-progress');
}

function isDigits(str) {
    return /^[0-9]+$/.test(str);
}


export { createTask };

