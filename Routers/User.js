const express = require("express")
const { login,CreateTeacher,CreateAdmin,GetSpecs } = require("../Controllers/UserController")

const router = express.Router()

router.post('/login', login)
router.post('/teacher', CreateTeacher)
router.post('/admin', CreateAdmin)
router.get('/specs', GetSpecs)

module.exports = router