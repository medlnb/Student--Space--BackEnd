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
    const teachers = user.map(usr=>(usr.username))
    return res.status(201).json({ username:teachers , email, isTeacher: true })
  }
  
  // const modules = [
  //   {teacher: ["Dr. Aiadi Oussama"],module:"Image Numérique"},
  //   {teacher: ["Dr. Bouanane.K","Dr. Dokkar.Besma"],module: "Statistics for Data Science"},
  //   {teacher: ["Dr. Khaldi.An","Dr. Khaldi.B"],module: "Programming for Data Science"},
  //   {teacher: ["Dr. Khaldi.B"],module: "Data exploration and visualization"},
  //   {teacher: ["Dr. Bouanane.K","Dr. Dokkar.Besma"],module: "Mathematics for Machine Learning 1"},
  //   {teacher: ["Dr. Chabbi selma"],module: "English" }]
  
    
  if (password !== user.password)
    return res.status(404).json({ PwErr:"wrong password"})
    
  return res.status(201).json({ username: user.username, email })
}

module.exports = {
  login,
  CreateTeacher
}