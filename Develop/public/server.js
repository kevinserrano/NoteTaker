//load dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

//initialize
const app = express();
const PORT = process.env.PORT || 3000;
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);