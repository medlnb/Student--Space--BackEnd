const express = require("express")
const {
  CreateRequest,
  GetRequests,
  AccepteRequest,
  RejectRequest
}= require("../Controllers/Request")

const router = express.Router()

router.get('/', GetRequests)
router.post('/', CreateRequest)
router.post('/:_id', AccepteRequest)
router.post('/reject/:_id', RejectRequest)

module.exports = router