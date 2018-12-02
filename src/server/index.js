var express = require('express');
var bodyParser = require('body-parser');
var valorInicial = require('./characters')
var app = express();

var list = Array.apply([], valorInicial);
var nextId = list.length + 1;

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/api/characters', (req, res) => {
    console.log('GET /api/characters called');

    res.send(list);
});

app.get('/api/characters/:id', (req, res) => {
    console.log(`GET /api/characters/${req.params.id} called`);

    var item = list.filter(item => item.id == req.params.id)[0];

    res.send(item);
});

app.post('/api/characters', (req, res) => {
    console.log(`POST /api/characters called`);

    var newItem = req.body;

    newItem.id = nextId;
    nextId++;

    list.push(newItem);

    res.send(`The character ${req.body.auterego} was saved with sucess!`);
});

app.put('/api/characters/:id', (req, res) => {
    console.log(`POST /api/characters${req.params.id} called`);

    var item = list.filter(item => item.id == req.params.id)[0];
    var index = list.indexOf(item);

    var newItem = req.body;
    
    newItem.id = Number(req.params.id);

    list.splice(index, 1, newItem);

    res.send(`The character ${req.body.auterego} was updated with sucess!`);
});


app.delete('/api/characters/:id', (req, res) => {
    console.log(`GET /api/characters/${req.params.id} called`);

    var item = list.filter(item => item.id == req.params.id)[0];
    var index = list.indexOf(item);

    console.log(index);

    list.splice(index, 1);

    res.send(`The character ${req.body.auterego} was deleted with sucess!`);
});

app.listen(3001, () => console.log('Listening on port 3001!'));
