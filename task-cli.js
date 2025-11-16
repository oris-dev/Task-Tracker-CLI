
const { create } = require('domain');
const fs = require('fs');
let id = 1;

cliConvos();


function cliConvos() {

    const funcWord = process.argv[2];


    switch (funcWord) {

        //usage: add <description> - adds a task with the following description
        case 'add':

            // creates a description
            let description = process.argv.filter((value, index) => {
                if (index > 2)
                    return value;
            });

            if (description.length === 0) {
                console.log('invalid description');
                break;
            }

            // changes the description
          

            description = description.join(' ');
            console.log(createTask(description));


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

        default:
            console.log(new Error("Please enter a valid command"));
            break;


    }

    // status , createdAt , updatedAt
    function createTask(desc) {
        const now = new Date().toDateString();
        return { id: id++, description: desc, status: 'to-do', createdAt: now, updatedAt: now};
    }

}