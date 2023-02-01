const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

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
            text,
            id: uuid.v4()
        };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const parseNotes = JSON.parse(data);

        parseNotes.push(newNote);

        const noteString = JSON.stringify(parseNotes);

        fs.writeFile("./db/db.json", noteString, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    res.json(newNote);
    }
});

// DELETE request for note with given id
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const parseNotes = JSON.parse(data);

        let count = 0;
        parseNotes.forEach(note => {
            if(note.id === req.params.id) {
                parseNotes.splice(count, 1);
                const noteString = JSON.stringify(parseNotes);

                fs.writeFile("./db/db.json", noteString, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                res.json(note);
            }
            count++;
        });
    });
});

// GET request for homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// creates server
app.listen(PORT, () => 
    console.log(`Express server listening at http://localhost:${PORT}`)
);