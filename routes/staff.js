const express = require("express");
const router = express.Router();

const Staff = require("../models/staff");
const CurrentJobs = require("../models/CurrentJobs");
const Payment = require("../models/payment");
const Attendance = require("../models/attendance");

/* Staff registration route */
router.post("/staffreg", (req, res) => {
  Staff.findOne({ Email: req.body.email }).then((staff) => {
    if (staff) {
      return res.status(400).json({ ID: "Staff already exists." });
    } else {
      const newStaff = new Staff({
        Name: req.body.name,
        Phone: req.body.phone,
        Email: req.body.email,
        Specialisation: req.body.specialisation,
        Address: req.body.address,
        Password: req.body.password,
      });
      newStaff
        .save()
        .then((staff) => res.json(staff))
        .catch((err) => console.log(err));
    }
  });
});
/* Staff login route */
router.post("/stafflogin", (req, res) => {
  console.log(req.body);
  Staff.findOne({ Email: req.body.email }).then((staff) => {
    if (!staff) {
      res.status(404).json({ Message: "User not found!" });
    }

    if (staff.Password === req.body.password) {
      console.log(staff.id);
      res.json({
        success: true,
        token: staff.id,
      });
    } else {
      res.status(400).json({ keyincorrect: "Incorrect correct password" });
    }
  });
});

/* Staff dashboard route */
router.post("/staffdashboard", (req, res) => {
  Staff.findOne({ _id: req.body.id }).then((staff) => {
    if (!staff) {
      return res.status(404).json({ Message: "Staff not found!" });
    }
    res.json(staff);
  });
});

/* Payment Details */
router.post("/payments", (req, res) => {
  Payment.find({ StaffID: req.body.StaffID, Concern: "Staff" }).then(
    (payment) => {
      if (!payment) {
        return res.status(404).json({ Message: "Payment not found!" });
      }
      res.json(payment);
    }
  );
});

/* Get Staff Current Job */
router.post("/currentjobs", (req, res) => {
  CurrentJobs.find({ Staff: { $elemMatch: { ID: req.body.id } } }).then(
    (request) => {
      if (!request) {
        return res.status(404).json({ Message: "Requests not found!" });
      }
      res.json(request);
    }
  );
});

/* Attendance */
router.post("/checkinattendance", (req, res) => {
  console.log("checkin here");

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;

  console.log(newdate);

  const newAttendance = new Attendance({
    StaffID: req.body.staffID,
    StaffName: req.body.staffName,
    JobID: req.body.jobID,
    JobName: req.body.jobName,
    Date: newdate,
    CheckIn: Date(),
  });
  newAttendance.save().then((attendance) => {
    res.json(attendance);
  });
});

/* Attendance */
router.post("/checkoutattendance", (req, res) => {
  console.log("checkout here");

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;

  Attendance.updateOne(
    { StaffID: req.body.staffID, JobID: req.body.jobID, Date: newdate },
    { CheckOut: Date() },
    function (err, r) {
      if (err) {
        res.json({ Message: "User did not checkin." });
      } else res.json({ Message: "User attendance updated successfully" });
    }
  );
});
/* Payments */
router.post("/currentjobs", (req, res) => {
  Payment.find({ Conern: "Staff", StaffID: req.body.StaffID }).then((jobs) => {
    if (!staff) {
      return res.status(404).json({ Message: "Jobs not found!" });
    }
    res.json(jobs);
  });
});
module.exports = router;
