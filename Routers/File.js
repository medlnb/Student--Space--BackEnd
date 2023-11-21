const express = require("express")
const { CreateFile,GetModules } = require("../Controllers/File")


const router = express.Router()



router.get('/:p', GetModules)
router.post('/', CreateFile)

module.exports = router