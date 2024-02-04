const express = require("express");
const {
  GetSchedule,
  createSchedule,
  updateSchedule,
  GetGroupsSchedules,
  ChangeScheduleParams,
  GetParams,
} = require("../Controllers/Schedule");

const router = express.Router();

router.get("/:tableinfo", GetSchedule);
router.get("/GetParams/:tableinfo", GetParams);
router.get("/groups/:tableinfo", GetGroupsSchedules);
router.post("/:tableinfo", createSchedule);
router.patch("/:tableinfo", updateSchedule);
router.patch("/scheduleparams/:specIndex", ChangeScheduleParams);

module.exports = router;
