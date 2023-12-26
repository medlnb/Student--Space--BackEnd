const express = require("express")
const { GetSchedule, createSchedule,updateSchedule } = require("../Controllers/NewSchedule")

const router = express.Router()

router.post('/get/', GetSchedule)
router.post('/', createSchedule)
router.patch('/', updateSchedule)


module.exports = router