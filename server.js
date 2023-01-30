const express = require("express");
const app = express();

const PORT = 3001;

// creates server
app.listen(PORT, () => 
    console.log(`Express server listening at http://localhost:${PORT}`)
);