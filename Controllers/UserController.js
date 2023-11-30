const User = require("../Models/UserModel")


const CreateTeacher = async (req, res) => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password, isTeacher: true })
  if (!user)
    return res.status(409).json({ err: "Failled creating Teacher" })
  return res.status(200).json({ username:username, email, isTeacher: true  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }) 

  if (!user)
    return res.status(404).json({ MailErr:"Email does'nt exist"})

  if (user.isTeacher)
    return res.status(201).json({ username: email, email: isTeacher.module, isTeacher: true })    
  if (password !== user.password)
    return res.status(404).json({ PwErr:"wrong password"})
    
  return res.status(201).json({ username: user.username, email })
}

module.exports = {
  login,
  CreateTeacher
}