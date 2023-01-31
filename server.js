const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// GET request for homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET request for notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET request for notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) =>{
        const parseNotes = JSON.parse(data);

        res.json(parseNotes);
    })
})

// POST request to save notes
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const parseNotes = JSON.parse(data);

        parseNotes.push(newNote);

        const noteString = JSON.stringify(parseNotes);

        fs.writeFile("./db/db.json", noteString, (err) =>
            err
                ? console.log(err)
                : console.log("Note has been written to JSON file")
        );
    });
    res.json(newNote);
    }
});

// creates server
app.listen(PORT, () => 
    console.log(`Express server listening at http://localhost:${PORT}`)
);