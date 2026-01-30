const express = require('express');

const app = express();

app.use(express.json())
// this is written such that our server reads req.body

const notes = [

]

app.post('/notes',(req,res) =>{
    console.log(req.body);
    notes.push(req.body)
    res.send("notes created");
})


app.get('/notes',(req,res) => {
    res.send(notes)
})

app.get('/',(req,res) => {
    res.send("Hello world");
})

app.listen(3000);