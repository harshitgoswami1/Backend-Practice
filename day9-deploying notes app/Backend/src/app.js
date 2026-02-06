const express = require("express");
const noteModel = require("./models/notes.model")
const cors = require("cors");
const path = require("path");



const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("./public"))



app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

// .create() - part of mongoose documentation.

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    // find model returns data in the form of array of objects

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

/*
DELETE
*/

app.delete("/api/notes/:id",async (req,res) => {
    const id = req.params.id


    await noteModel.findByIdAndDelete(id);
    
    res.status(200).json({
        message:"note deleted successfully"
    })
})


/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })

})
  


// console.log(__dirname)

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app