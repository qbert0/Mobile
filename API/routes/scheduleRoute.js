const express = require('express')
const router = express.Router()
const scheduleRoute = require("../controllers/scheduleController")

router.get('/about', scheduleRoute.bookClinic)


router.get('/doctors',scheduleRoute.getAllDoctors)
router.get('/doctor/:doctor_id', scheduleRoute.getDoctorById)
router.get('/doctors_by_specialty/:specialty_id', scheduleRoute.getDoctorBySpecialty)
router.get('/clinic/:doctor_id', scheduleRoute.getClinicByDoctor)
router.post('/order', scheduleRoute.createOrder)
router.get('/ordertime', scheduleRoute.getAllTime)
router.get('/hourbydate/:doctor_id/:date_time', scheduleRoute.getHourByDate)
module.exports = router