const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: String,
    description: String
})

const notesModel = mongoose.model("notes",notesSchema)
// notes is the name of the collection here.

module.exports = notesModel