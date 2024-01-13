const express = require("express")
const { createTask, removeTask ,getTasks} = require("../Controllers/Task")

const router = express.Router()

router.get('/:specIndex', getTasks)
router.post('/create/:specIndex', createTask)
router.delete('/:taskid', removeTask)

module.exports = router