import fs from "node:fs";
import {loadTasks,updateTasks, getMaxID} from "./task-load.js";
let id = 1;
const maxDescLength = 100;

cliConvos();


async function  cliConvos() {

    const funcWord = process.argv[2];


    switch (funcWord) {

        //usage: add <description> - adds a task with the following description
        case 'add':

            // creates a description
            let description = process.argv.filter((value, index) => {
                if (index > 2)
                    return value;

            });

            if (testLength(description, maxDescLength)) {
                // changes the description
                description = description.join(' ');
                console.log(createTask(description));
            };

            console.log("Unvalid description")

            break;

        // usage: rename <id> <newname> - rename an existing task
        case 'rename':
            console.log('rename');
            break;

        //usage: delete <id>
        case 'delete':
            console.log('delete');

            break;


        // usage: list - lists all the tasks which are not 'done'
        case 'list':
            console.log('list');
            break;

        //usage: listByStatus <status> - lists all the items in the status mentioned
        case 'listByStatus':
            console.log('listByStatus');
            break;

        case 'test':
            const maxID =  await getMaxID();
            const newTask = createTask("chomp chomp", maxID+1);
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
    if (variable.length === 0 || variable.length > maxLength) {
        console.log(`Please enter a string between 0 chars and ${maxLength} chars`);
    }
}


export { createTask };

