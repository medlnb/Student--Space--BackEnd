const express = require("express")
const { GetSchedule, createSchedule,updateSchedule } = require("../Controllers/NewSchedule")

const router = express.Router()

router.get('/:classgroup', GetSchedule)
router.post('/', createSchedule)
router.patch('/:classgroup', updateSchedule)


module.exports = router