const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const HOST = '127.0.0.1'
const DATABASE = "agendamento"
const PORT = 27017

mongoose.connect(`mongodb://${HOST}:${PORT}/${DATABASE}`).then(() => {
    console.log("Conectado ao banco")
}).catch(error => {
    console.log(error)
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")






app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})



app.listen(8080, () => {
    console.log("Servidor rodando")
})