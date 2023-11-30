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
  const user = await User.find({ email }) 

  if (!user[0])
    return res.status(404).json({ MailErr: "Email does'nt exist" })
  
  if (user[0].isTeacher) {
    let teachers = user.map(usr => (usr.username))
    if (teachers.length === 1)
      teachers = teachers[0]
    return res.status(201).json({ username:teachers , email, isTeacher: true })
  }    
  if (password !== user[0].password)
    return res.status(404).json({ PwErr:"wrong password"})
    
  return res.status(201).json({ username: user[0].username, email })
}

module.exports = {
  login,
  CreateTeacher
}