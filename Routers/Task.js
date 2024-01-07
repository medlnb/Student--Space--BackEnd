const express = require("express")
const { createTask, removeTask ,getTasks} = require("../Controllers/Task")

const router = express.Router()

router.post('/', getTasks)
router.post('/create', createTask)
router.delete('/:taskid', removeTask)

module.exports = router