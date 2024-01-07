const express = require("express")
const { login,CreateTeacher,CreateAdmin,GetSpecs ,getTeachers} = require("../Controllers/UserController")

const router = express.Router()

router.post('/login', login)
router.post('/teacher', CreateTeacher)
router.post('/admin', CreateAdmin)
router.get('/specs', GetSpecs)
router.post('/teacher/get', getTeachers)


module.exports = router