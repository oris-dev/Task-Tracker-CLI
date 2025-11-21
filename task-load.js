import fs from "fs";
const jsonPath = "./tasks.json";

// loads all the tasks from the JSON. Changing them into Objects
// if there is no tasks file, create a new empty one 
async function loadTasks() {

    try {
        // making sure the file exists 
        if (fileExists(jsonPath)) {
            const rawData = await fs.promises.readFile(jsonPath, 'utf-8');
            const data = JSON.parse(rawData);
            return data;
        }
    } catch (e) {
        //if the file does not exist return an empty array 
        // and create a new file 
        fs.promises.writeFile(jsonPath, '{}', err => {
            err ? Console.log("Tasks JSON file has been created succsessfully ") : console.log("Unable to create the tasks JSON file", err);
        })
        return [];
    }
}

// takes the updated JSON Tasks and puts it in the file 
async function updateTasks(changes) {

    // try to add the changes , if it does not work create a file in the same location
    try {
        const tasks = await loadTasks(); // returns an array of js objects 
        console.log(tasks);
        tasks.push(changes);
        const tasksJSON = JSON.stringify(tasks, null, 2) // convert back to JSON
        console.log(tasks);
        await fs.promises.writeFile(jsonPath, tasksJSON, "utf8");
    }

    catch (e) {
        console.log(e);
    }
}

async function fileExists(path) {
    try {
        await fs.promises.access(path);
        return true;
    } catch (e) {
        return false;
    }
}

// a helper function for finding max ID when creating a new task
async function getMaxID() {

    const tasksData = loadTasks(); // returns a js object of all the tasks

    if (tasksData.length === 0) return 0; // if the file is empty, there is not IDs
    if (tasksData.length === 1) return tasksData[0].id; //if theres one value, then its the max ID


    let maxID = tasksData[0].id;

    // look in the array and find the max id
    for (let i = 1; i < tasksData.length; i++) {

        if (tasksData[i].id > maxID) maxID = tasksData[i].id;
    }

    return maxID;
}



export { updateTasks, loadTasks, getMaxID };