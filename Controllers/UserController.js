const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Schedule = require("../Models/Schedule");

const CreateAdmin = async (req, res) => {
  const { username, email, password, speciality, Year, Module } = req.body;
  const arrayOfEmptyDays = Array.from({ length: 36 }, (_, i) => ({
    Classname: " ",
    Type: " ",
    Classroom: " ",
    dayID: i,
  }));
  const existSchedule = await Schedule.findOne({
    Year,
    Speciality: speciality,
    Group: "main",
  });
  if (existSchedule)
    return res.status(409).json({ err: "Schedule already exist" });
  const newSchedule = await Schedule.create({
    Days: arrayOfEmptyDays,
    Year,
    Speciality: speciality,
    Group: "main",
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

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(404).json({ err: "Email already used" });
  const user = await User.create({
    username: username,
    email,
    password,
    speciality: [],
  });
  if (!user) return res.status(404).json({ err: "Failled creating User" });

  return res.status(200).json({ username });
};
const getUsers = async (req, res) => {
  const authorization = req.user;
  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex];
  const Users = await User.find({
    speciality: {
      $elemMatch: {
        name: speciality.name,
        Year: speciality.Year,
      },
    },
  }).select(" -__v -password");

  if (!Users) return res.status(409).json({ err: "Failled Finding Users" });
  return res.status(201).json(Users);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ err: "Email does'nt exist" });

  if (password !== user.password)
    return res.status(404).json({ err: "wrong password" });

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

    if (!Specs) {
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
  createUser,
  CreateAdmin,
  GetSpecs,
  getUsers,
  AddTeacher,
};
