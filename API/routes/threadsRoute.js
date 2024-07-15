const express = require('express')
const router = express.Router()

const threadsController = require("../controllers/threadsController")


router.get("/threadAll", threadsController.getAllThread)
router.post("/createNewThread", threadsController.createNewThread)
router.get("/getThreadById", threadsController.getThreadById)
router.post("/createComment", threadsController.createComent)
router.get("/threadAllForSelf", threadsController.getAllThreadForSelf)

module.exports = router