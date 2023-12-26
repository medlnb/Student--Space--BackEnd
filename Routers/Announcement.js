const express = require("express")
const { CreateAnnouncement ,GetAnnouncements,RemoveAnnouncement} = require("../Controllers/Announcement")

const router = express.Router()


router.get('/:spec', GetAnnouncements)
router.post('/', CreateAnnouncement)
router.delete('/:announcementid', RemoveAnnouncement)



module.exports = router