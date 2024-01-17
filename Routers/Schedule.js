const express = require("express");
const {
  GetSchedule,
  createSchedule,
  updateSchedule,
  GetGroupsSchedules,
} = require("../Controllers/Schedule");

const router = express.Router();

router.get("/:tableinfo", GetSchedule);
router.get("/groups/:tableinfo", GetGroupsSchedules);
router.post("/:tableinfo", createSchedule);
router.patch("/:tableinfo", updateSchedule);

module.exports = router;
