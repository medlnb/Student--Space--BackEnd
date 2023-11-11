const express = require("express")
const { GetSchedule, createDays,updateSchedule } = require("../Controllers/Schedule")

const router = express.Router()

router.get('/', GetSchedule)
router.post('/', createDays)
router.patch('/', updateSchedule)


module.exports = router