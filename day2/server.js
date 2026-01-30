const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello mac")
})

app.get('/about',(req,res)=>{
    res.send("About us : this is our story")
})
app.get('/home',(req,res)=>{
    res.send("Home : welcome to the home page")
})

app.listen(3000);