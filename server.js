const express = require("express");
const fs = require("fs")
const PORT = 3002;
const path = require('path')

const app = express();
const noteid = require("./express/public/helpers/id");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(`${req.method} request received`);

  console.info(`${req.method} request received to get notes`);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: noteid(),
    };

    const noteSrting = JSON.stringify(newNote);

    fs.writeFile(`./express/db/db.json`, noteSrting, (err) =>
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
  console.log(`Expree sever listening on port ${PORT}!`);
});
