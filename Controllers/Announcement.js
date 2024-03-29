const Announcement = require("../Models/Announcement");
const User = require("../Models/UserModel");

async function sendTelegramMessage(token, channel, message) {
  const request = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${message}`,
    {
      method: "GET",
      redirect: "follow",
    }
  );

  const response = await request.json();
  return response;
}

const CreateAnnouncement = async (req, res) => {
  const { Content } = req.body;
  const { specIndex } = req.params;
  const authorization = req.user;
  const Year = authorization.speciality[specIndex].Year;
  const speciality = authorization.speciality[specIndex].name;
  const Publisher = authorization.username;
  const date = new Date();

  const admin = await User.findOne(
    {
      speciality: {
        $elemMatch: {
          name: speciality,
          Year,
          Admin: true,
        },
      },
    },
    {
      "speciality.$": 1,
    }
  );

  const announcement = await Announcement.create({
    Publisher,
    Content,
    Date: date,
    speciality,
    Year,
  });

  if (!announcement)
    return res.status(404).json({ err: "Error Creating the Announcement" });

  await sendTelegramMessage(
    process.env.TOKEN,
    admin.speciality[0].Channel,
    `New Announcement from ${announcement.Publisher}:
    \n${Content}`
  );
  return res.status(201).json(announcement);
};

const GetAnnouncements = async (req, res) => {
  const authorization = req.user;
  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;
  const announcements = await Announcement.find({ speciality, Year }).sort({
    createdAt: "desc",
  });
  if (!announcements)
    return res.status(404).json({ err: "Error Getting the Announcements" });
  return res.status(201).json(announcements);
};

const RemoveAnnouncement = async (req, res) => {
  const announcementid = req.params.announcementid;
  const exist = await Announcement.deleteOne({ _id: announcementid });

  if (!exist)
    return res.status(401).json({ err: "Error removing a announcement" });

  return res.status(201).json({ msg: "Announcement removed" });
};
module.exports = {
  CreateAnnouncement,
  GetAnnouncements,
  RemoveAnnouncement,
};
