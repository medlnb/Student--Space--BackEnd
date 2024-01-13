const express = require("express")
const { CreateAnnouncement ,GetAnnouncements,RemoveAnnouncement} = require("../Controllers/Announcement")

const router = express.Router()


router.get('/:specIndex', GetAnnouncements)
router.post('/create/:specIndex', CreateAnnouncement)
router.delete('/:announcementid', RemoveAnnouncement)



module.exports = router