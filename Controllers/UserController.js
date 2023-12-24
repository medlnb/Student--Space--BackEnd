const User = require("../Models/UserModel")


const CreateAdmin = async (req, res) => {
  const { username, email, password,speciality,Year,Module } = req.body
  const user = await User.create(
    {
      username,
      email,
      password,
      speciality:[{name:speciality,Admin:true}],
      Year,
      Module
    }
  )
  if (!user)
    return res.status(409).json({ err: "Failled creating Teacher" })
  return res.status(200).json({
    username: username,
    email,
    Module,
    Year,
    speciality:[{name:speciality,Admin:true}],
  })
}

const CreateTeacher = async (req, res) => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password, isTeacher: true })
  if (!user)
    return res.status(409).json({ err: "Failled creating Teacher" })
  return res.status(200).json({ username:username, email, isTeacher: true  })
}


const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.find({ email }) 

  if (!user[0])
    return res.status(404).json({ MailErr: "Email does'nt exist" })
  
  if (user[0].Module) {
    if (password === user[0].password)
      return res.status(201).json({
        username: user[0].username,
        email: user[0].email,
        Module:user[0].Module,
        speciality: user[0].speciality,
        Year:user[0].Year
      })
    else {
      return res.status(401).json({ PwErr:"wrong password"})
    }
  }    
  if (password !== user[0].password)
    return res.status(404).json({ PwErr:"wrong password"})
    
  return res.status(201).json({ username: user[0].username, email ,speciality:user[0].speciality})
}

module.exports = {
  login,
  CreateTeacher,
  CreateAdmin
}