const e = require('express');
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
    readFileAsync("./db/db.json", "utf8")
        .then((result, err) => {
            if (err) console.log(err);
            return res.json(JSAON.parse(result));
        });
});