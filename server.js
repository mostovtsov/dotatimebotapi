const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static('public'));
app.use(express.static('public/app'));
app.use(bodyParser.json());

var hearsJSON;
fs.readFile('./data/hears.json', 'utf8', function (err, data) {
    if (err) {
        console.log(`Can't read hears.json`);
    }
    else {
        hearsJSON = data;
    }
});

app.get('/hears', function (req, res) {
  if(hearsJSON){
      res.send(hearsJSON);
  }
});

app.listen(port, function () {
    console.log(`started at port ${port}`);
});