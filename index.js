const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

let tasks = [];
let lastTask = null;
let currentTask = {task:"none", timestamp:0};

const fileName = "data.json";

app.get("/",(req, res)=>{

    if(tasks.length==0) {
    fs.readFile(fileName, (err, data)=>{
        tasks = JSON.parse(data);
        if(tasks.length>0)
        currentTask = tasks[tasks.length-1];
        res.render("home",{currentTask:currentTask, lastTask:lastTask});
    });
    }
    else {
        res.render("home",{currentTask:currentTask, lastTask:lastTask});
    }
 

    
});

app.post("/", (req,res)=>{
    const taskName = req.body.task;
    const date = Math.floor(Date.now()/1000);
    const task = {task:taskName, timestamp:date}
    tasks.push(task);
    console.log(tasks);
    lastTask = currentTask.task;
    currentTask = task;
    fs.writeFile(fileName, JSON.stringify(tasks),"utf-8", ()=>{});
    res.redirect("/");
});

app.listen(3000, ()=>{
    console.log("server is running");
});

