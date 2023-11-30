const Announcement = require("../Models/Announcement")

async function sendTelegramMessage(token, channel, message) {
    try {
        // Construct the Telegram API endpoint for sending a message
        const request = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${message}`, {
            method: 'GET',
            redirect: 'follow'
        });

        // Parse the JSON response from the Telegram API
        const response = await request.json();

        // Return the response object
        return response;
    } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error:', error);
    }
}



const CreateAnnouncement = async (req, res) => {
  const { Publisher, Content } = req.body
  const date = new Date()
  
  const announcement = await Announcement.create({Publisher,Content,Date:date}) 

  if (!announcement)
    return res.status(404).json({ err: "Error Creating the Announcement" })
  
  sendTelegramMessage(process.env.TOKEN,
    process.env.CHANNEL,
    `New Announcement from ${announcement.Publisher}:
    \n${Content}`);

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