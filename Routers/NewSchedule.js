const express = require("express")
const { GetSchedule, createSchedule,updateSchedule } = require("../Controllers/NewSchedule")

const router = express.Router()

router.get('/:specIndex', GetSchedule)
router.post('/:specIndex', createSchedule) //not done yet in Client Side.
router.patch('/:specIndex', updateSchedule)


module.exports = router