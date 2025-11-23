# Task Tracker CLI
So there will be a few layers to this CLI. 

CLI:

There will be a few commands available in the CLI:
(Add | Update | Delete | Mark task status | List | List by status)
1. add <description> 
2. rename <id> <description> 
3. mark <id> <status>
4. delete <id>
5. list 
6. listByStatus <status>

----------------------------------------------

Task object: There will be an array of tasks with the needed information.

-- Task Properties --
1. id - unique identifier for the task
2. description - self explanatory 
3. status - should be on of the 3 ('to-do','in-progress', 'done')
4. createdAt: date and time when created
5. updatedAt: date and time when updated 

default states:
1. id - checkForMaxID+1
2. description - ""
3. status - 'todo'
4. createAt -  getCurrentDate()
5. updatedAt - getCurrentDate()

-----------------------------------
## Service Tasks 



firstly loads all the tasks from the store, coverts it into js objects.



-----------------------------------------
## Store Tasks: 

-- Works asynchronosouly -- 
*Means that it runs in the background while the main event loop works, So it doesnt distrupt and take a lot of time* 

- when I use these should be awaited until the data collection ends

Main operation - update the json file with the newest information or either load information from it. 

loadTasks - loads all the tasks
updateTasks - update all the tasks to the current state that has been changed