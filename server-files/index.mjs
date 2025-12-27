import express from "express";
import { loadTasks, getMaxID } from "../ManageTasks/task-load.js";
import { addTask, renameTask, getTaskById } from "../ManageTasks/task-store.js";
const app = express();
const PORT = process.env.PORT || 3000; // grab the port value from nodejs or else defaults it into 3000



//using json middlewear, enabling it to read json
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

/*
    I need to add routing as well - meaning I need to create 'pathways' for the website so
    it will need to recognize on which part of the site I am

    so to route my API I need to create a structure
    I am going to use - api/tasks in order to find tasks meaning:
    api/tasks:id - will filter by ID
    api/tasks:status - will filter by status
  
 */


// get a list of all the tasks

app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await loadTasks(); // load all the tasks from the json
        return res.json(tasks);
    } catch (e) {
        return res.status(500).json({ error: "Failed to load tasks" });
    }
});

//create a new task
app.post("/api/tasks", async (req, res) => {
    const now = new Date().toDateString();
    //  const newID = await getMaxID();
    //console.log(newID);
    const newTask = { id: await getMaxID() + 1, description: req.body.description, status: "to-do", createdAt: now, updatedAt: now }
    await addTask(newTask);
    return res.status(201).send(newTask);
});

// get task by ID

app.get("/api/tasks/:id", async (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) return res.status(400).json({ error: "Bad Request(invalid id)" });
    const task = await getTaskById(parsedId);
    if(!task) return res.status(404).json( {error: "Task has not been found"})

    return res.status(200).json(task);
});


// rename task by ID
app.patch("/api/tasks/:id", async (req, res) => {
    const parsedId = parseInt(req.params.id);
    const description = req.body.description;
    if (isNaN(parsedId)) return res.status(400).json({ error: "Bad Request(invalid id)" });
    await renameTask(parsedId, description);
    return res.status(200).json({message: `Task with the id of ${parsedId} was uppdated`});
});






