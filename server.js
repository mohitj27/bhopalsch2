var express = require('express');
const nodemailer = require('nodemailer');
//const xoauth2 = require('xoauth2');
const smtpT = require('nodemailer-smtp-transport');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
    service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
  
   auth: {
       
           user: "mjjpjgms@gmail.com",
           pass: "bhopalsch123"
       
   }
});



var complaints = [{title: 'Title', department: 'THIS IS BODY', description: 'asdsfersdscsdsdsds'},
{title: 'Title', department: 'THIS IS BODY hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', description: 'asdsfersdscsdsdsds'},
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
    complaint.date = new Date();
    console.log(req.body);
    if(complaint.department==="electricity"){
    var mailOptions = {
        from: 'Mohit Jain<mjjpjgms@gmail.com>',
        to: 'mjain8156@gmail.com',
        subject: `${complaint.title}`,
        text: `complaint Received ${complaint.description}`
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error: ', err);
        } else {
            console.log('Email Sent: ', res);
        }
    });
}
  else if(complaint.department==="PWD"){
    var mailOptions = {
        from: 'Mohit Jain<mjjpjgms@gmail.com>',
        to: 'jiwanprakash65@gmail.com',
        subject: `${complaint.title}`,
        text: `complaint Received ${complaint.description}`
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error: ', err);
        } else {
            console.log('Email Sent: ', res);
        }
    });
  }
    
     //complaints.push(req.body);
     res.sendStatus(200); 
    // res.json(complaints);
})
auth.post('/login',(req,res) =>{
   var user =  users.find(user =>user.email == req.body.email);
    if(!user)
       sendAuthError(res); 

    if(user.password == req.body.password)
      sendToken(user,res);
      else 
        sendAuthError(res);
})
auth.post('/register',(req,res)=>{
    var index = users.push(req.body) - 1;
    
    var user = users[index];
    user.id = index;
    
    //sendToken(user,res);
    sendToken(user,res);
    console.log(req.body);
    console.log(users);
   
})

function sendToken(user,res) {
    var token = jwt.sign(user.id,'123');
    res.json({firstName: user.firstName, token});
}
function sendAuthError(res) {
    return res.json({success: false, message: 'email or password incorrect'});
}
app.use('/api',api);
app.use('/auth',auth);
app.listen(1234);
//node mailer 
//push messaging
//isloggedin
//department signup
//admin login

/*

const nodemailer = require('nodemailer');

const xoauth2 = require('xoauth2');


var mailOptions = {
    from: 'Jeevan Prakash <jhajeevanprakash65@gmail.com>',
    to: 'mjain8156@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error: ', err);
    } else {
        console.log('Email Sent: ', res);
    }
});

*/
