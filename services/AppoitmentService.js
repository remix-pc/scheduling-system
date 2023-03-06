const appointment = require("../model/Appointment")
const mongoose = require("mongoose")


const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {

        async Create(name, email, description, cpf, date, time) {

            var newAppo = new Appo({
                name,
                email,
                description,
                cpf,
                date,
                time
            })

            try{
                await newAppo.save()
                return true
            }catch(error) {
                console.log(error)
                return false
            }
        }
}

module.exports = new AppointmentService()