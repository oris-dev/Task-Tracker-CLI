import { updateTasks,loadTasks } from "./task-load.js";
import { createTask } from './task-cli.js';

// sorta works but not really yet, It needs some more adjustments, it creates a new json file
// but it doesn't change it properly or test what is already in the file. I need to 
// read the file => meaning to load it first, then analyze what to add
/*const exampleObj = createTask("test description");

console.log(exampleObj);
let jsonObj = JSON.stringify(exampleObj, null , 2);
updateTasks(jsonObj);
*/

test();


 function test(){
    const newTask = createTask("chomp chomp");
    updateTasks(newTask);
}

