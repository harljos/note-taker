const express = require("express");
const app = express();
const path = require("path");

const PORT = 3001;

app.use(express.static("public"));

// GET request for homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

// creates server
app.listen(PORT, () => 
    console.log(`Express server listening at http://localhost:${PORT}`)
);