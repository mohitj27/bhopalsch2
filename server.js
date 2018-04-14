var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var complaints = [{ title: '1', body: 'THIS IS BODY', id: 1 },
{title: '2', body: 'THIS IS BODY', id: 2},
{title: '3', body: 'THIS IS BODY', id: 3},
{title: '4', body: 'THIS IS BODY', id: 4},
{title: '5', body: 'THIS IS BODY', id: 5}];

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept");
    next()
})
app.get('/complaints',(req,res) => {
    //res.send('hello');
    res.json(complaints);
})

app.post('/complaint',(req,res) => {
     console.log(req.body);  
     complaints.push(req.body);
     res.sendStatus(200); 
    //res.json(complaints);
})

app.listen(1234);