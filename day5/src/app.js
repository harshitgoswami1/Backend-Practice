const express = require("express")
const app = express()

app.use(express.json())

let notes = [];

app.post("/notes",(req,res) => {
    notes.push(req.body)

    res.status(201).json({
        message : "Note created successfully"
    })
})

app.get("/notes",(req,res) => {
    res.status(200).json({
        notes: notes
    })
})

app.delete("/notes/:index",(req,res) => {
   notes.splice(req.params.index, 1)
   res.status(204).send()
})
// notes.splice(1, 2) Remove 2 elements starting at index 1


app.patch("/notes/:index",(req,res) => {
    notes[req.params.index].description = req.body.description
    res.status(200).json({
        message:"note updated successfully"
    }) 
})

module.exports = app