const express = require("express")
const { createTask, removeTask ,getTasks} = require("../Controllers/Task")

const router = express.Router()

router.post('/', getTasks)
router.post('/', createTask)
router.delete('/:taskid', removeTask)

module.exports = router