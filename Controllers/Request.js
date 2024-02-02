const Request = require("../Models/Request");
const User = require("../Models/UserModel");
const nodemailer = require("nodemailer");

const CreateRequest = async (req, res) => {
  const { Speciality, Year } = req.body;
  const { email, username } = req.user;
  const exist = await Request.findOne({ email, Speciality, Year });

  if (exist)
    return res
      .status(409)
      .json({ err: "U've already send a request to this Speciality" });

  const existUser = await User.findOne({
    email,
    speciality: {
      $elemMatch: {
        name: Speciality,
        Year,
      },
    },
  });
  if (existUser) return res.status(409).json({ err: "U r already Added" });

  const request = await Request.create({
    email,
    username,
    Speciality,
    Year,
  });

  if (!request) return res.status(404).json({ err: "Error creating Student!" });
  return res
    .status(201)
    .json({ msg: "Request sended, please wait for response in your email." });
};

const GetRequests = async (req, res) => {
  try {
    const authorization = req.user;
    const { specIndex } = req.params;
    const Speciality = authorization.speciality[specIndex].name;
    const Year = authorization.speciality[specIndex].Year;

    const requests = await Request.find({
      Speciality,
      Year,
    });

    if (!requests)
      return res.status(404).json({ msg: "Error getting requests!" });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ msg: "Error getting requests!" });
  }
};

const AccepteRequest = async (req, res) => {
  const { _id } = req.params;
  const request = await Request.findOne({ _id });
  const { email, Year, Speciality } = request;
  const user = await User.findOne({ email });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedlanabi0@gmail.com",
      pass: "rddv gnyx ptrd qtkl",
    },
  });

  const mailOptions = {
    from: "mohamedlanabi0@gmail.com",
    to: email,
    subject: "Welcome to Student's Space! Your Request has been Approved 🎉",
    text: `Salam ${user.username},
      We hope this email finds you well.
      We are pleased to inform you that you have been added to ${Speciality} ~ ${Year}! 
      Welcome aboard!

      Please log out and log back in to see your new Speciality.
      (You can Logout by clicling on the user icon next to your name in the top of the screen)

      Best regards,
      Lanabi Mohamed
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    if (user) {
      user.speciality.push({
        name: Speciality,
        Year,
        Group: "main",
      });

      await user.save();
    } else return res.status(404).send({ err: "Can't find this user!" });
    await Request.deleteOne({ _id });
    return res.status(201).json({ msg: "Request Accepted & Mail Sended" });
  } catch (error) {
    return res.status(500).send({ err: "Failed to accept the request!" });
  }
};

const RejectRequest = async (req, res) => {
  const { _id } = req.params;
  const request = await Request.findOne({ _id });
  const { email, Year, Speciality } = request;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedlanabi0@gmail.com",
      pass: "rddv gnyx ptrd qtkl",
    },
  });

  const mailOptions = {
    from: "mohamedlanabi0@gmail.com",
    to: email,
    subject: "Regarding Your Student's Space Request",
    text: `Salam ,

          I trust this message finds you well.
          we regret to inform you that your request to use ${Speciality} ~ ${Year} has not been accepted at this time.

          We understand that this news may be disappointing,
          and we want to assure you that this decision was not made lightly.
          If you have any specific concerns or questions regarding the rejection,
          please do not hesitate to reach out to our support team at lanabi.mohamed@univ-ouargla.dz.
          They will be happy to provide any necessary clarification.

          Thank you for your understanding, and we wish you the best in your endeavors.

          Best regards,
          Lanabi Mohamed
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await Request.deleteOne({ _id });
    res.status(201).json({ msg: `${email} rejected.` });
  } catch (error) {
    res.status(500).json({ err: "Failed to send email!" });
  }
};

module.exports = {
  CreateRequest,
  GetRequests,
  AccepteRequest,
  RejectRequest,
};
