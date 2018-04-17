var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var complaints = [{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'},
{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'},
{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'},
{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'},
{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'}];

var users = [];
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept");
    next()
})
var api = express.Router();
var auth = express.Router();

api.get('/complaints',(req,res) => {
    //res.send('hello');
    res.json(complaints);
})

api.post('/complaints',(req,res) => {
    var index = complaints.push(req.body) - 1;
    var complaint = complaints[index];
    complaint.id = index;
    console.log(req.body);  
     //complaints.push(req.body);
     res.sendStatus(200); 
     //res.json(complaints);
})
auth.post('/register',(req,res)=>{
    var index = users.push(req.body) - 1;
    
    var user = users[index];
    user.id = index;
    var token = jwt.sign(user.id,'123');
    
    console.log(req.body);
    console.log(users);
    res.json({firstName: user.firstName, token});
})
app.use('/api',api);
app.use('/auth',auth);
app.listen(1234);