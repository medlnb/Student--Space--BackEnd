const express = require("express")
const { login,CreateTeacher,CreateAdmin } = require("../Controllers/UserController")

const router = express.Router()

router.post('/login', login)
router.post('/teacher', CreateTeacher)
router.post('/admin', CreateAdmin)


module.exports = router