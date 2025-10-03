const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let taskId = 1;

app.get("/myTasks", (req, res) => {
    res.json(tasks);
});

app.get("/myTasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if(!task)
        return res.status(404).json({ message: "This task is not found!"});

    res.json(task);
});

app.post("/myTasks", (req, res) => {
    const { title, isCompleted = false} = req.body;
    if(!title)
        return res.status(400).json({ message: "A task needs a title!"});

    const createdTask = {id: taskId++, title, isCompleted };
    tasks.push(createdTask);
    res.status(201).json(createdTask);
});

app.put("/myTasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if(!task)
        return res.status(404).json({ message: "This task is not found!"});

    const { isCompleted } = req.body;
    if(isCompleted === undefined)
        return res.status(400).json({ message: "Update if the Task is completed or not!"});

    task.isCompleted = isCompleted;
    res.json(task);
});

app.delete("/myTasks/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const task = tasks.find(task => task.id === id);
    if(!task)
        return res.status(404).json({ message: "No such Task to delete!"});

    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: `Task with the id ${id} has been deleted.`});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});