const app = require("./src/app")
const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect("mongodb+srv://harshit:9j78vYwVO8CaSmMJ@cluster0.nmyvwc1.mongodb.net/day-6")
    .then(() => {
        console.log("connected to DB")
    })
}
connectDB()

app.listen(3000,() => {
    console.log("app is running on port 3000")
})
