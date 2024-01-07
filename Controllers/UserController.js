const User = require("../Models/UserModel")
const File = require("../Models/File")


const CreateAdmin = async (req, res) => {
  const { username, email, password,speciality,Year,Module } = req.body
  const user = await User.create(
    {
      username,
      email,
      password,
      speciality: [{
        name: speciality,
        Admin: true,
        Year,
        Modules:[Module]
      }],
    }
  )
  if (!user)
    return res.status(409).json({ err: "Failled creating Teacher" })
  return res.status(200).json({
    username,
    email,
    speciality: [{
        name: speciality,
        Admin: true,
        Year,
        Modules:[Module]
      }],
  })
}

const CreateTeacher = async (req, res) => {
  const { username, email, password, speciality } = req.body
  
  const user = await User.create({ username:"Dr. "+username, email, password,speciality })
  const file = await File.create({Teacher:username, speciality:speciality.name, Year:speciality.Year,Module:speciality.Modules})
  if (!user || !file)
    return res.status(409).json({ err: "Failled creating Teacher" })
  return res.status(200).json({ username:username  })
}
const getTeachers = async (req, res) => {
  const speciality = req.body

 const Teachers = await User.find(
  {
    'speciality': {
      $elemMatch: {
        'name': speciality.name,
        'Year': speciality.Year
      }
    }
  }
).select('-_id -__v -speciality')

  if (!Teachers)
    return res.status(409).json({ err: "Failled Finding Teacher" })
  return res.status(201).json(Teachers)
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }) 

  if (!user)
    return res.status(404).json({ MailErr: "Email does'nt exist" })

  if (password !== user.password)
    return res.status(404).json({ PwErr:"wrong password"})
  
  if (user.speciality[0].Modules) { 
      return res.status(201).json({
        username: user.username,
        email: user.email,
        speciality: user.speciality
      })
  }    
  return res.status(201).json({
    username: user.username,
    email,
    speciality: user.speciality
  })
}

const GetSpecs = async (req, res) => {
  try {
    const Specs = await User.find({
    'speciality': {
      $elemMatch: {
        "Admin": { $exists: true }
      }
    }})

    if (!Specs || Specs.length === 0) {
      return res.status(409).json({ err: "Failed Finding Teachers" });
    }

    const filteredSpecs = Specs.reduce((acc, teacher) => {
      teacher.speciality.forEach(spec => {
        if (spec.Admin) {
          acc.push({ spec: spec.name, Year: spec.Year });
        }
      });
      return acc;
    }, []);

    return res.status(200).json(filteredSpecs);
  } catch (error) {
    return res.status(500).json({ err: "Internal Server Error" });
  }
};


module.exports = {
  login,
  CreateTeacher,
  CreateAdmin,
  GetSpecs,
  getTeachers
}