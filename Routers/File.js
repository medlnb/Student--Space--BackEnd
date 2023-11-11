const express = require("express")
const { CreateFile,GetModules } = require("../Controllers/File")


const router = express.Router()



router.get('/', GetModules)
router.post('/', CreateFile)

module.exports = router