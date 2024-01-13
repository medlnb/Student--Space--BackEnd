const express = require("express")
const { CreateFile,GetModules } = require("../Controllers/File")

const router = express.Router()

router.get('/:p', GetModules)
router.post('/create', CreateFile)

module.exports = router