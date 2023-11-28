const express = require("express")
const {
  CreateRequest,
  GetRequests,
  AccepteRequest
}= require("../Controllers/Request")

const router = express.Router()

router.get('/', GetRequests)
router.post('/', CreateRequest)
router.post('/:_id', AccepteRequest)

module.exports = router