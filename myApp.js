require('dotenv').config()
let bodyParser = require('body-parser')

let express = require('express');
let app = express();

app.use("/public",express.static(__dirname+"/public"))

app.use(bodyParser.urlencoded({extended:false}));

app.post('/name',(req,res)=>{
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({"name":`${firstName} ${lastName}`}) 
})

app.get('/name',(req,res)=>{
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({"name":`${firstName} ${lastName}`})
})

const middleware = (req,res,next) => {
    req.time = new Date().toString();
    next();
};

app.get('/now',middleware,(req,res)=>{
    //console.log(req.method+" - "+req.path+" - "+req.ip);
    res.send({time:req.time});
})

app.get('/:word/echo',(req,res)=>{
    res.json({"echo":req.params.word})
})

app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/views/index.html");
  });

app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE==="uppercase")
    {
        res.json({"message":"Hello json".toUpperCase()});
    }else
    {
        res.json({"message":"Hello json"});
    }
});




 module.exports = app;