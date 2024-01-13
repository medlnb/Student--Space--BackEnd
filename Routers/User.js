const express = require("express")
const RequireAuth = require("../Middleware/RequireAuth");
const { login,CreateTeacher,CreateAdmin,GetSpecs ,getTeachers,AddTeacher} = require("../Controllers/UserController")

const router = express.Router()

router.post('/login', login)
router.post('/admin', CreateAdmin)
router.post('/teacher', CreateTeacher)

router.use(RequireAuth)
router.get('/specs', GetSpecs)
router.get('/teacher', getTeachers)
router.patch('/teacher', AddTeacher)



module.exports = router