const express = require("express")
const { GetSchedule, createSchedule,updateSchedule } = require("../Controllers/NewSchedule")

const router = express.Router()

router.post('/get/', GetSchedule)
router.post('/', createSchedule)
router.patch('/:classgroup', updateSchedule)


module.exports = router