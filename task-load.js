import fs from "fs";
const jsonPath = "./tasks.json";

// loads all the tasks from the JSON. Changing them into Objects
async function loadTasks(){
    const rawData = await fs.promises.readFile(jsonPath, 'utf-8');
    const data = JSON.parse(rawData);

    return data;
}

// takes the updated JSON Tasks and puts it in the file 
    async function updateTasks(changes){

    // try to add the changes , if it does not work create a file in the same location
    try{
        const tasks = await loadTasks(); // returns an array of js objects 
        console.log(tasks);
        tasks.push(changes);
        const tasksJSON = JSON.stringify(tasks, null , 2) // convert back to JSON
        console.log(tasks);
        await fs.promises.writeFile(jsonPath, tasksJSON, "utf8"); 
    }

    catch(e){
        console.log(e);
    }
}

export {updateTasks, loadTasks};