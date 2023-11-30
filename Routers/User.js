const express = require("express")
const { login,CreateTeacher } = require("../Controllers/UserController")


const router = express.Router()

router.post('/login', login)
router.post('/teacher', CreateTeacher)


module.exports = router