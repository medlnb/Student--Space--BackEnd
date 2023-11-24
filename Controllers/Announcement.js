const Announcement = require("../Models/Announcement")
const nodemailer = require('nodemailer')

const CreateAnnouncement = async (req, res) => {
  const { Publisher, Content } = req.body
  const date = new Date()
  
  const announcement = await Announcement.create({Publisher,Content,Date:date}) 

  if (!announcement)
    return res.status(404).json({ err: "Error Creating the Announcement" })
  
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mohamedlanabi0@gmail.com',
      pass: "rddv gnyx ptrd qtkl",
    },
  });
const password = generatePassword(10)
  const mailOptions = {
    from: 'mohamedlanabi0@gmail.com',
    to: mail,
    subject: Publisher,
    text: Content,
  };


  try {
    await transporter.sendMail(mailOptions);
    await User.create({ email: mail, password, username: firstname + " " + lastname })
    return res.status(201).json({ mail })
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email!');
  }
  
  return res.status(201).json(announcement)
}

const GetAnnouncements = async (req, res) => { 
  const announcements = await Announcement.find().sort({ createdAt: 'desc' });
  if (!announcements)
    return res.status(404).json({ err: "Error Getting the Announcements" })
  return res.status(201).json(announcements)
}

const RemoveAnnouncement = async (req, res) => {
  const announcementid = req.params.announcementid
  const exist = await Announcement.deleteOne({ _id: announcementid })

  if (!exist)
    return res.status(401).json({ err: "Error removing a announcement" })
  
  return res.status(201).json({ msg: "Announcement removed" })
  
}
module.exports = {
  CreateAnnouncement,
  GetAnnouncements,
  RemoveAnnouncement
}