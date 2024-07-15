const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');

prisma = new PrismaClient()

class scheduleController {
    async bookClinic(req,res) {
        try {
            const data = await prisma.user.findMany()
            console.log(data)
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }

    async getAllDoctors(req, res) {
        try {
            const data = await prisma.doctor.findMany()
            console.log(data)
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }

    async getRecommentDoctors(req, res) {
        try {
            const data = await prisma.clinic.findMany({
                select : {
                    name : true,
                    doctor_id : true,
                    Doctor : {
                        select : {
                            name : true,
                        }
                    }
                },
                orderBy: {
                    Order : {
                        _count : 'asc'
                    }
                },
                take : 3
            })
            console.log(data)
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }


    async getDoctorById(req, res) {
        try {
            const doctor_id = req.params.doctor_id
            const data = await prisma.doctor.findMany({
                where:{
                    id:doctor_id
                },
                include:{
                    clinics : {
                        where: {
                            doctor_id:doctor_id
                        },
                        include:{
                            Specialty: true
                        }
                    }
                    
                },
            })
            console.log(data)
            console.log("asd")
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }

    async getDoctorBySpecialty(req, res) {
        try {
            const specialty_id = req.params.specialty_id
            const data = await prisma.clinic.findMany({
                where: { specialty_id: specialty_id },
                include :{
                    Doctor: true,
                    Specialty: true
                }
              });



            console.log(data)
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }

    async getClinicByDoctor(req, res) {
        try {
            const doctor_id = req.params.doctor_id
            const data = await prisma.clinic.findMany({
                where:{
                    doctor_id:doctor_id
                },
                include:{
                    Specialty: true
                    
                },
            })
            console.log(data)
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }

    async createOrder(req, res) {
        try {
            const {doctorId, customerId, date_time, hour_time, clinic_id} = req.body
            console.log(date_time)
            const response = await prisma.order.create({
                data:{
                    time: [1],
                    date_time: date_time,
                    hour_time: hour_time,
                    comment:"ok",
                    done: false,
                    doctor :{
                        connect:{
                            id: doctorId
                        }
                    },
                    custom:{
                        connect:{
                            id: "8b57944c-1e70-4a2e-83ec-30532e698de3"
                        }
                    },
                    Clinic:{
                        connect:{
                            id: clinic_id
                }}}
            })
            console.log(response)
            res.send(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorCode:1,
                msg: "Server" + error.message
            })
        }
    }
    async getAllTime(req, res) {
        try {
            const response = await prisma.order.findMany({
                where: {
                    date_time: {
                        not: null
                    }
                }
            });
            
            // Tạo một mảng mới chỉ chứa giá trị của cột data_time
            const dataTimes = response.map(order => order.date_time);
            
            console.log(dataTimes);
            res.send(dataTimes);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }

    async getHourByDate(req, res) {
        try {

            const { doctor_id, date_time } = req.params; // Extract doctor_id and date_time from URL params
            console.log("date_time" + date_time)
            const response = await prisma.order.findMany({
                where: {
                    hour_time:{
                        not:null
                    },
                    date_time: date_time,
                    doctorId: doctor_id
                }
            });
            
            // Tạo một mảng mới chỉ chứa giá trị của cột data_time
            const dataTimes = response.map(order => order.hour_time);
            
            console.log(dataTimes);
            res.send(dataTimes);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }
    
    async GetAllOrders(req, res) {
        try {

            const { customer_id } = req.params; // Extract doctor_id and date_time from URL params
            const response = await prisma.order.findMany({
                where: {
                    customId: customer_id
                },
                include : {
                    doctor : {
                        select : {
                            name: true,
                        }
                    }
                }
               
            });
                        
            console.log(response);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }

    async getCustomerByCustomerId(req, res) {
        try {

            const { customer_id } = req.params; // Extract doctor_id and date_time from URL params
            const response = await prisma.Customer.findMany({
                where: {
                    id: customer_id
                }
            });
                        
            console.log(response);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }

    
    async getClinicByClinicId(req, res) {
        try {

            const { clinic_id } = req.params; // Extract doctor_id and date_time from URL params
            const response = await prisma.Clinic.findMany({
                where: {
                    id: clinic_id
                },
                include:{
                    Specialty: true
                }
            });
                        
            console.log(response);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }
}


module.exports = new scheduleController()