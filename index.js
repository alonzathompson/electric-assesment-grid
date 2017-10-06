const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const send = require("./mailhandler/sendMail.js");


const port = process.env.PORT || 3500;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname + "public"));
});

app.get('/info', (req,res)=>{
  res.sendFile(path.join(__dirname + "public"));
});

app.get('/finish', (req,res)=>{
  console.log("I got that");
});

app.post('/finish', (req, res) =>{
  const info = JSON.parse(req.body.info);
  const score = `${Math.floor(req.body.score)}%`;
  console.log(info, info.email, score);

  send.callTransporter(info.firstName,info.email,score);
  res.send("got data ok");
})

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, ()=>{
  console.log('listening on port 3500');
});
