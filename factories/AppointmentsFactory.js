
class AppointmentFactory{


     Build(simpleAppointments){

        var day = simpleAppointments.date.getDate()+1
        var month = simpleAppointments.date.getMonth()
        var year = simpleAppointments.date.getFullYear()    

        var hour = Number.parseInt(simpleAppointments.time.split(":")[0])
        var minutes = Number.parseInt(simpleAppointments.time.split(":")[1])


        var startDate = new Date(year, month, day, hour, minutes, 0,0)


        var appo = {
            id: simpleAppointments.id,
            title: simpleAppointments.name + " - " + simpleAppointments.description,
            start: startDate,
            end: startDate,
            notified: simpleAppointments.notified,
            email: simpleAppointments.email
        }
        return appo
    }

}

module.exports = new AppointmentFactory()