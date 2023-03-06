const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean,
    notified: Boolean
})

module.exports = Appointment