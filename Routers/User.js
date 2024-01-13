const express = require("express")
const RequireAuth = require("../Middleware/RequireAuth");
const { login,CreateTeacher,CreateAdmin,GetSpecs ,getTeachers,AddTeacher} = require("../Controllers/UserController")

const router = express.Router()

router.post('/login', login)
router.post('/admin', CreateAdmin)
router.post('/teacher', CreateTeacher)
router.get('/specs', GetSpecs)

router.use(RequireAuth)
router.get('/teacher/:specIndex', getTeachers)
router.patch('/teacher/:specIndex', AddTeacher)



module.exports = router