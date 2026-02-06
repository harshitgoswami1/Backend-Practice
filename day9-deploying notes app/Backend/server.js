require("dotenv").config()
const connectToDb = require("./src/config/database")
const app = require("./src/app")

const PORT = process.env.PORT || 3000

connectToDb()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
