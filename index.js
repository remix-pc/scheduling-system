const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const appoitmentServices = require('./services/AppoitmentService')


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
    res.render("index")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})


app.post("/create", async (req, res) =>{
   var status = await appoitmentServices.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
     )

     if(status) {
        res.redirect("/")
     }else {
        res.send("Ocorreu uma falha")
     }

})

app.get("/getCalendar", async (req, res) => {

    var apointments = await appoitmentServices.GetAll(false)

    res.json(apointments)

})

app.get("/event/:id", async (req, res) =>{
    var appointment = await appoitmentServices.getById(req.params.id)
    console.log(appointment)
    res.render("event", {appo: appointment})
})

app.post("/finish", async (req, res) => {
    var id = req.body.id
    await appoitmentServices.Finished(id)
    res.redirect("/")
})

app.get("/list", async (req, res) => {
    //await appoitmentServices.Search("guilherme@teste.com")
    var appos = await appoitmentServices.GetAll(true)
    res.render("list",{appos})

})


app.get("/searchresult", async (req, res) => {
    console.log(req.query.search)
    var appos = await appoitmentServices.Search(req.query.search)
    res.render("list", {appos})
})






app.listen(9790, () => {
    console.log("Servidor rodando")
})