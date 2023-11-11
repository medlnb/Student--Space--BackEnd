const express = require("express")
const { sendMail,CreateStudent,CreateStudents } = require("../Controllers/Student")


const router = express.Router()



router.post('/send-mail', sendMail)
router.post('/', CreateStudent)
router.post('/multi', CreateStudents)
module.exports = router