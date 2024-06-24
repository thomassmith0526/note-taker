const express = require("express");
const fs = require("fs")
const PORT = 3002;
const path = require('path')
const fsPromises = require('fs').promises;
const app = express();
const noteId = require("./express/public/helpers/id");
const { json } = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API paths
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/express/public/index.html"))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/express/public/notes.html'))
);

//API GET
app.get("/api/notes", (req, res) => {
  fsPromises.readFile('./express/db/db.json','UTF-8', (err,data) => data)
  .then((data) => res.json(JSON.parse(data)))

  console.info(`${req.method} request received to get notes`);
});
// API POST
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: noteId(),
    };

 

    const noteString = JSON.stringify(newNote);
    

    fs.writeFile(`./express/db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );
    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

app.listen(PORT, () => {
  console.log(`Express sever listening on port ${PORT}!`);
});


