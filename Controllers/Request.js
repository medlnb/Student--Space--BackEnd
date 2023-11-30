const Request = require("../Models/Request")
const User = require("../Models/UserModel")
const nodemailer = require('nodemailer')

const CreateRequest = async (req, res) => {
  const { matricule, mail, firstname, lastname, Speciality, password } = req.body
  const exists = await Request.findOne({ mail })
  if (exists)
    return res.status(409).json({ err: "This Email allrddy exists" })
  const exist = await Request.findOne({ matricule })
  if (exist)
    return res.status(409).json({ err: "This Matricule allrddy exists" })
  const request = await Request.create({ matricule, mail, firstname, lastname,Speciality ,password})
  if (!request)
    return res.status(404).json({ err:"Error creating Student!"})
  return res.status(201).json({msg:"Request sended, please wait for response in your email."})
  
}

const GetRequests = async (req,res) => {
  try {
    const requests = await Request.find({}, { password: 0, __v: 0 })
    if (!requests)
      return res.status(404).json({ msg:"Error getting requests!"})
    
    return res.status(200).json(requests);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Error getting requests!" });
  }
}

const AccepteRequest = async (req,res) => {
  try {
    const { _id } = req.params
    const request = await Request.findOne({ _id })
  
    const { firstname, lastname, mail,password,matricule } = request
  
    const user = await User.findOne({ email: mail })
    if (user)
      return res.status(401).json({err:"u alrddy have an acc!"})

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohamedlanabi0@gmail.com',
        pass: "rddv gnyx ptrd qtkl",
      },
    });
    
    const mailOptions = {
      from: 'mohamedlanabi0@gmail.com',
      to: mail,
      subject: 'Welcome to Student\'s Space! Your Account Request has been Approved 🎉',
      text: `Salam ${lastname} ${firstname},
        We hope this email finds you well. We are pleased to inform you that your request to use Student\'s Space has been accepted! Welcome aboard!

        Your Account Details:

        mail: ${mail}
        Password: ${password}
        Please keep your login details secure and do not share them with anyone.
        If you have any questions or encounter any issues while accessing your account,
        feel free to reach out to our support team at lanabi.mohamed@univ-ouargla.dz.

        We are excited to have you as part of our community.
        Explore, engage, and make the most of your experience!

        Best regards,
        Lanabi Mohamed
        `,
    }

    try {
      await transporter.sendMail(mailOptions);
      await User.create({ email: mail, password, username: firstname + " " + lastname })
      res.status(201).json({ mail })
    } catch (error) {
      console.log(error)
      res.status(500).send('Failed to send email!');
    }
    await Request.deleteOne({_id})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Error Accepting the request!" });
  }
}


const RejectRequest = async (req, res) => {
  const { _id } = req.params
  const request = await Request.findOne({ _id })
  const { firstname, lastname, mail } = request

  
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohamedlanabi0@gmail.com',
        pass: "rddv gnyx ptrd qtkl",
      },
    });
    
    const mailOptions = {
      from: 'mohamedlanabi0@gmail.com',
      to: mail,
      subject: 'Regarding Your Student\'s Space Request',
      text: `Salam ${lastname} ${firstname},

          I trust this message finds you well.
          We appreciate your interest in Student's Space and the time you took to submit your request.
          After careful consideration,
          we regret to inform you that your request to use Student's Space has not been accepted at this time.

          We understand that this news may be disappointing,
          and we want to assure you that this decision was not made lightly. 
          If you have any specific concerns or questions regarding the rejection, 
          please do not hesitate to reach out to our support team at lanabi.mohamed@univ-ouargla.dz.
          They will be happy to provide any necessary clarification.

          Thank you for your understanding, and we wish you the best in your endeavors.

          Best regards,
          Lanabi Mohamed
        `,
    }

    try {
      await transporter.sendMail(mailOptions);
      await Request.deleteOne({_id})
      res.status(201).json({msg: `${mail} rejected.` })
    } catch (error) {
      console.log(error)
      res.status(500).send('Failed to send email!');
    }
}

module.exports = {
  CreateRequest,
  GetRequests,
  AccepteRequest,
  RejectRequest
}