//load dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');


const app = express();
const PORT = process.env.PORT || 3000;
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//route to path
app.use(express.static(__dirname + 'public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//getting notes
app.get("/api/notes", (req, res) => {
    readFileAsync("./db/db.json", "utf8")
        .then((result, err) => {
            if (err) console.log(err);
            return res.json(JSAON.parse(result));
        });
});
//
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.post("/api/notes"), (req, res) => {
    let newNotes = req.body
    readFileAsync("./db/db.json", "utf8")
        .then((result, err) => {
            if (err) console.log(err);
            return Promise.resolve(JSON.parse(result));
        })

}