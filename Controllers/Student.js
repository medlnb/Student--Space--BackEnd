const Student = require("../Models/StudentModel")
const User = require("../Models/UserModel")
const nodemailer = require('nodemailer');


function generatePassword(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}
const CreateStudent = async (req, res) => {
  const {matricule,mail,firstname,lastname} = req.body
  const user = await Student.create({ matricule, mail, firstname, lastname })
  if (!user)
    return res.status(404).json("Error creating Student!")
  return res.status(201).json({matricule,mail,firstname,lastname})
  
}
const CreateStudents = async (req, res) => {
  const studentsData = req.body;

  try {
    const createdStudents = await Student.create(studentsData);
    return res.status(201).json(createdStudents);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error creating students.");
  }
}



const sendMail = async (req, res) => {
  const { matricule } = req.body;


  const stu = await Student.findOne({ matricule })
  if (!stu)
    return res.status(404).json({err:"Student's Space database doesn't reconize this matricule!"})

  const { firstname, lastname, mail } = stu
  

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
const password = generatePassword(10)
  const mailOptions = {
    from: 'mohamedlanabi0@gmail.com',
    to: mail,
    subject: 'Creating Password For Your Student\'s Space',
    text: `This is ur password: ${password}`,
  };


  try {
    await transporter.sendMail(mailOptions);
    await User.create({ email: mail, password, username: firstname + " " + lastname })
    return res.status(201).json({ mail })
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email!');
  }

}


module.exports = {
  sendMail,
  CreateStudent,
  CreateStudents
}