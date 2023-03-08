const appointment = require("../model/Appointment")
const mongoose = require("mongoose")
const AppointmentFactory = require('../factories/AppointmentsFactory')
const mailer = require('nodemailer')


const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {



        async Create(name, email, description, cpf, date, time) {

            var newAppo = new Appo({
                name,
                email,
                description,
                cpf,
                date,
                time,
                finished: false,
                notified: false
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

        async sendNotification(){
            var appos = await this.GetAll(false)

            var transporter = mailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "1bf929ffba4765",
                    pass: "327d95ea9bbde7"
                }
            })


            appos.forEach( async app => {
                var date = app.start.getTime()
                var hour = 1000 * 60 * 60

                var gap = date - Date.now()

                if(gap <= hour) {
                    
                    if(!app.notified) {
                     

                        await Appo.findByIdAndUpdate(app.id, {notified: true})

                        transporter.sendMail({
                            from: "Remixo <g09efue@gmail.com>",
                            to: app.email,
                            subject: "Sua consulta vai acontecer em breve.",
                            text: "Sua consulta vai acontecer em 1 hora."
                        }).then(() => {

                        }).catch(error => {
                            console.log(error)
                        })



                    }

                }

            })
        }
}

module.exports = new AppointmentService()