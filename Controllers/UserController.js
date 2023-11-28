const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET)
}

const login = async (req, res) => {
  const {email,password} = req.body
  const modules = [
    {teacher: ["Dr. Aiadi Oussama"],module:"Image Numérique"},
    {teacher: ["Dr. Bouanane.K","Dr. Dokkar.Besma"],module: "Statistics for Data Science"},
    {teacher: ["Dr. Khaldi.An","Dr. Khaldi.B"],module: "Programming for Data Science"},
    {teacher: ["Dr. Khaldi.B"],module: "Data exploration and visualization"},
    {teacher: ["Dr. Bouanane.K","Dr. Dokkar.Besma"],module: "Mathematics for Machine Learning 1"},
    {teacher: ["Dr. Chabbi selma"],module: "English" }]
  
  let isTeacher = null
  modules.map(mdl => {
    if (mdl.module == email) {
      isTeacher = mdl
      return
    }
  })
  if (isTeacher)
    return res.status(201).json({ username: isTeacher.teacher, email:isTeacher.module, token: createToken("asd") })
  
  const user = await User.findOne({ email }) 

  if (!user)
    return res.status(404).json({ MailErr:"Email does'nt exist"})
  
  if (password !== user.password)
    return res.status(404).json({ PwErr:"wrong password"})
    
  return res.status(201).json({ username: user.username, email, token: createToken(user._id) })
}

module.exports = {
  login
}