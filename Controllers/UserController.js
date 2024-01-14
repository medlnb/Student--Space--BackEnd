const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const NewSchedule = require("../Models/NewSchedule");

const CreateAdmin = async (req, res) => {
  const { username, email, password, speciality, Year, Module } = req.body;
  const emptyStringsArray = Array(36).fill("");
  const newSchedule = await NewSchedule.create({
    modules: emptyStringsArray,
    Classrooms: emptyStringsArray,
    types: emptyStringsArray,
    Year,
    Class: speciality,
  });
  const user = await User.create({
    username,
    email,
    password,
    speciality: [
      {
        name: speciality,
        Admin: true,
        Year,
        Module,
      },
    ],
  });
  if (!user || !newSchedule)
    return res.status(409).json({ err: "Failled creating Admin" });
  return res.status(200).json({
    username,
    email,
    speciality: [
      {
        name: speciality,
        Admin: true,
        Year,
        Module,
      },
    ],
    token: jwt.sign(
      {
        username,
        email,
        speciality: [
          {
            name: speciality,
            Admin: true,
            Year,
            Module,
          },
        ],
      },
      process.env.SECRET
    ),
  });
};

const AddTeacher = async (req, res) => {
  const { email, Module } = req.body;
  const authorization = req.user;
  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex];
  const updatedUser = await User.updateOne(
    { email },
    {
      $push: {
        speciality: {
          name: speciality.name,
          Year: speciality.Year,
          Module,
        },
      },
    }
  );
  if (!updatedUser)
    return res.status(409).json({ err: "Failled Adding Teacher" });
  return res.status(200).json({ email });
};

const CreateTeacher = async (req, res) => {
  const { username, email, password } = req.body;
  const exist = User.findOne(email);
  if (exist) return res.status(404).json({ err: "Email already used" });
  const user = await User.create({
    username: "Dr. " + username,
    email,
    password,
    speciality: [],
  });
  if (!user) return res.status(404).json({ err: "Failled creating Teacher" });

  return res.status(200).json({ username: "Dr. " + username });
};
const getTeachers = async (req, res) => {
  const authorization = req.user;
  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex];
  const Teachers = await User.find({
    speciality: {
      $elemMatch: {
        name: speciality.name,
        Year: speciality.Year,
        Module: { $exists: true },
      },
    },
  }).select("-_id -__v ");

  if (!Teachers)
    return res.status(409).json({ err: "Failled Finding Teacher" });
  return res.status(201).json(Teachers);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ MailErr: "Email does'nt exist" });

  // const unlocked = jwt.verify(token, process.env.SECRET)
  if (password !== user.password)
    return res.status(404).json({ PwErr: "wrong password" });

  return res.status(201).json({
    username: user.username,
    email,
    speciality: user.speciality,
    token: jwt.sign(
      {
        username: user.username,
        email,
        speciality: user.speciality,
      },
      process.env.SECRET
    ),
  });
};

const GetSpecs = async (req, res) => {
  try {
    const Specs = await User.find({
      speciality: {
        $elemMatch: {
          Admin: { $exists: true },
        },
      },
    });

    if (!Specs || Specs.length === 0) {
      return res.status(409).json({ err: "Failed Finding Teachers" });
    }

    const filteredSpecs = Specs.reduce((acc, teacher) => {
      teacher.speciality.forEach((spec) => {
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
  getTeachers,
  AddTeacher,
};
