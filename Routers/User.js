const express = require("express");
const RequireAuth = require("../Middleware/RequireAuth");
const {
  login,
  createUser,
  CreateAdmin,
  GetSpecs,
  getUsers,
  AddTeacher,
} = require("../Controllers/UserController");

const router = express.Router();

router.post("/login", login);
router.post("/admin", CreateAdmin);
router.post("/create", createUser);
router.get("/specs", GetSpecs);

router.use(RequireAuth);
router.get("/users/:specIndex", getUsers);
router.patch("/teacher/:specIndex", AddTeacher);

module.exports = router;
