const express = require('express')
const router = express.Router()
const userRouter = require("../controllers/UserControler")


router.get("/user", userRouter.fetchUser)
router.post("/createUser", userRouter.createUser)
router.get("searchUser", userRouter.SearchUser)

module.exports = router