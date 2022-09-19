const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const documentsRoutes = require("./routes/documents-routes")

const app = express()

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors())
app.use("/api", documentsRoutes)

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(process.env.PORT, (error) => { 
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);;
})