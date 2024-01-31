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
router.post("/create", createUser);

router.use(RequireAuth);
router.get("/specs", GetSpecs);
router.post("/admin", CreateAdmin);
router.get("/users/:specIndex", getUsers);
router.patch("/teacher/:specIndex", AddTeacher);

module.exports = router;
