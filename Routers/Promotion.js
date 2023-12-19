const express = require("express")
const { AccepteRequest, getPromotions,PostRequest } = require("../Controllers/Promotion")

const router = express.Router()

router.get('/', getPromotions)
router.post('/', PostRequest)
router.patch('/:_id', AccepteRequest)


module.exports = router