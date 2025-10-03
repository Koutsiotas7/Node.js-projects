
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let notes = [
    {id: 1, title: "Programming in C", content: "To print something we use the printf() line."},
    {id: 2, title: "Eurobasket bet", content: "Greece will win the Eurobasket 2025, after beating Germany in the Final."},
    {id: 3, title: "Trip thought", content: "I want to visit Spain. But I am uncertain which city should I visit. Madrid or Barcelona?"},
    {id: 4, title: "Day Plan", content: "Some running, then some basketball games, shower and after that one glass of orange juice and rest."},
];

app.get("/myNotes", (req, res) => {
    res.json(notes);
});

app.get("/myNotes/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if(!note)
    {
        return res.status(404).json({ error: "This note is not found!!"});
    }

    res.json(note);
});

app.post("/myNotes", (req, res) => {
    const {title, content } = req.body;
    const newNote = {id: notes.length + 1, title, content};
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.put("/myNotes/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if(!note)
    {
        return res.status(404).json({ error: "This note is not found!!"});
    }

    const { title, content } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    res.json(note);
});

app.delete("/myNotes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find(n => n.id === noteId);

    if (!note) {
        return res.status(404).json({ error: "This note is not found!!" });
    }

    notes = notes.filter(n => n.id !== noteId);
    res.json({ message: `Note with id ${noteId} has been deleted.` });
});

app.delete("/myNotes", (req, res) => {
    if (notes.length === 0) {
        return res.status(404).json({ error: "No notes to delete." });
    }

    notes = [];
    res.json({ message: "All notes have been deleted." });
});

app.listen(port, () => {
  console.log(`My Notes API running at http://localhost:${port}`);
});