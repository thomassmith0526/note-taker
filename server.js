const express = require("express");
const fs = require("fs")
const PORT = process.env.PORT || 3002;

const path = require('path')

const app = express();
const noteId = require("./express/public/helpers/id");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// API paths
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/express/public/index.html"))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/express/public/index.html'))
);

//API GET
app.get("/api/notes", (req, res) => {                                                                                                             
  res.json(`${req.method} request received to get notes`)

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

  fs.readFile('./express/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data)
      console.log(data)
      parsedNotes.push(newNote)

      fs.writeFile('./express/db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated notes')
        );
    }
  });

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


