const express = require('express')
const router = express.Router()
const examinationRouter = require("../controllers/examinationController")

router.get("/getAllExmanationForProfile", examinationRouter.getAllExaminationForProfile)
router.get('/getAllResultForExami', examinationRouter.getAllResultForExami)
router.get("/getAllDataForProfile", examinationRouter.getAllDataForProfile)
router.post('/createNewExami', examinationRouter.createNewExamiForWeb)
router.post('/createNewResult', examinationRouter.createNewResultForWeb)
router.post('/pushimageResult', examinationRouter.postNewResultImage)

module.exports = router