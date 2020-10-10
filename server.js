//load dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
const notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//route to path
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/db'));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    return res.json(notes)
});

//
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.post("/api/notes"), (req, res) => {
    const newNote = req.body;
    if(notes.length === 0){
        Object.assign(note, {"id": "0"})
      }else{
      const lastId = parseInt(notes[notes.length -1].id);
        Object.assign(newNote, {"id": (lastId + 1).toString()})
      }
      notes.push(newNote);
      res.json(newNote);
    };
    

app.delete("/api/notes/:id", (req, res) => {
    let selected = req.params.id;

    for (var i = 0; i < notes.length; i++) {
        if (selected === notes[i].id)
            notes.splice([i], 1)
    }
    return res.json(notes)
});

// starts the server
app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});
// gets last id used
function getLastIndex(data) {
    if (data.length > 0) return data[data.length - 1].id;
    return 0;
}