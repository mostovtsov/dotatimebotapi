const express = require('express');
const uuid = require('node-uuid');
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
    if (hearsJSON) {
        res.send(hearsJSON);
    }
});

app.post('/remove', function (req, res) {
    console.log('remove', req.body);
    var removedItem = req.body;
    var hearsArray = JSON.parse(hearsJSON);

    for (var i = hearsArray.length; i--;) {
        if (JSON.stringify(hearsArray[i].text) == JSON.stringify(removedItem.text)) {
            hearsArray.splice(i, 1);
        }
    }

    rewriteFile(fs, res, hearsArray);
    res.sendStatus(200);
});

app.post('/add', function (req, res) {
    console.log('add', req.body);
    var hearsArray = JSON.parse(hearsJSON);
    if (hearsArray.indexOf(req.body) < 0) {
        req.body.id = uuid.v1();
        hearsArray.push(req.body);

        rewriteFile(fs, res, hearsArray);
    }
    res.sendStatus(200);
});

app.listen(port, function () {
    console.log(`started at port ${port}`);
});


var rewriteFile = function (fs, res, hearsArray) {
    fs.writeFile('./data/hears.json', JSON.stringify(hearsArray), function (err, data) {
        if (err) {
            console.log(`Can't write hears.json`, err);
            res.sendStatus(500);
        }
    });
}