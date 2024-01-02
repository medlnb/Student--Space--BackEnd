const express = require("express")
const { CreateFile,GetModules } = require("../Controllers/File")

const router = express.Router()

router.post('/', GetModules)
router.post('/', CreateFile)

module.exports = router