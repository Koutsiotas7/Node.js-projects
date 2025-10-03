
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
    { id: 1, description: "Go to the super market.", isCompleted: false },
    { id: 2, description: "Walk with the dog.", isCompleted: false},
    { id: 3, description: "Buy a coffee.", isCompleted: false},
    { id: 4, description: "See the doctor.", isCompleted: false},
    { id: 5, description: "Play football with friends.", isCompleted: false},
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)
        return res.status(404).json({ error: "This task is not found."});
    res.json(task);
});

app.post("/tasks", (req, res) => {
    const {description} = req.body;
    const newTask = {id: tasks.length + 1, description, isCompleted: false};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)
        return res.status(404).json({ error: "This task is not found."});

    const {description, isCompleted} = req.body;
    if(description !== undefined)
    {
        task.description = description;
    }
    
    if(isCompleted !== undefined)
    {
        task.isCompleted = isCompleted;
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskExists = tasks.some(t => t.id === taskId);

    if (!taskExists) {
        return res.status(404).json({ error: "Task not found!" });
    }

    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: `Task with id ${taskId} deleted.` });
});

app.listen(port, () => {
  console.log(`To-Do-List API running at http://localhost:${port}`);
});