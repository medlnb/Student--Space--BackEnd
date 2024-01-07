const express = require("express")
const { CreateAnnouncement ,GetAnnouncements,RemoveAnnouncement} = require("../Controllers/Announcement")

const router = express.Router()


router.post('/', GetAnnouncements)
router.post('/create', CreateAnnouncement)
router.delete('/:announcementid', RemoveAnnouncement)



module.exports = router