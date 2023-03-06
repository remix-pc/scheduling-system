const appointment = require("../model/Appointment")
const mongoose = require("mongoose")
const AppointmentFactory = require('../factories/AppointmentsFactory')

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {


    async Delete(){
        Appo.findByIdAndDelete("64061b6d07231b06801af13d").then(() => {
            console.log("Deletado com sucesso.")
        }).catch(error => {
            console.log(error)
        }) 
    }

        async Create(name, email, description, cpf, date, time) {

            var newAppo = new Appo({
                name,
                email,
                description,
                cpf,
                date,
                time,
                finished: false
            })

            try{
                await newAppo.save()
                return true
            }catch(error) {
                console.log(error)
                return false
            }
        }

        async GetAll(showFinished){
            if(showFinished){
                return await Appo.find();
            }else{
                var appos = await Appo.find({'finished': false});
                var appointments = [];
    
                appos.forEach(appointment => {
                    if(appointment.date != undefined){
                        appointments.push( AppointmentFactory.Build(appointment) )
                    }                
                });
    
                return appointments;
            }
        }

        async getById(id) {
            try{

                var event = await Appo.findOne({"_id": id})
                return event
            }catch(error){
                console.log(error)
            }
        }

        async Finished(id) {
            try{
                await Appo.findByIdAndUpdate(id,{finished: true})
                return true
            }catch(error) {
                return false
                console.log(error)
            }
        }

        async Search(query) {

            try{

                var appos = await Appo.find().or({email: query}, {cpf: query})
                return appos

            }catch(error) {
                console.log(error)
                return []
            }
        }
}

module.exports = new AppointmentService()