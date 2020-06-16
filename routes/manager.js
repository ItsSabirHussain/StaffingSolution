const express = require("express");
const router = express.Router();
const Manager = require("../models/manager");
const CurrentJob = require("../models/CurrentJobs");
const JobRequest = require("../models/jobRequests");
const Staff = require("../models/staff");
const Payment = require("../models/payment");
const Attendance = require("../models/attendance");

/* Manager login route */
router.post("/clientlogin", (req, res) => {
  Manager.findOne({ Email: req.body.Email }).then((manager) => {
    if (!manager) {
      return res.status(404).json({ Message: "Manager not found!" });
    }
    if (manager.Password === req.body.Password) {
      res.json({
        success: true,
        token: "Bearer " + admin.id,
      });
    } else {
      return res
        .status(400)
        .json({ keyincorrect: "Incorrect correct password" });
    }
  });
});

/* Jobs requests */
router.post("/jobsrequestslist", (req, res) => {
  JobRequest.find({ Concern: "Manager" }).then((request) => {
    if (!request) {
      return res.status(404).json({ Message: "Requests not found!" });
    }
    res.json(request);
  });
});

/* Get Staff Current Job */
router.post("/getstaffcurrentjob", (req, res) => {
  console.log("here");
  CurrentJob.find({ Staff: { $elemMatch: { ID: req.body.id } } }).then(
    (request) => {
      if (!request) {
        return res.status(404).json({ Message: "Requests not found!" });
      }
      res.json(request);
    }
  );
});

/* Assign job */
router.post("/assignjob", (req, res) => {
  console.log(req.body.Detail);
  const newCurrentJob = new CurrentJob({
    JobID: req.body.JobID,
    JobTitle: req.body.JobTitle,
    Staff: req.body.Staff,
    ClientID: req.body.ClientID,
    ClientName: req.body.ClientName,
    Days: req.body.Days,
    CheckIn: req.body.CheckIn,
    CheckOut: req.body.CheckOut,
    Detail: req.body.Detail,
    Date: Date(),
  });
  newCurrentJob
    .save()
    .then((job) => {
      JobRequest.updateOne(
        { _id: req.body.JobID },
        { Concern: "Client", Status: "Assigned" },
        function (err, r) {
          if (err) {
            res.json({ Message: "Request not found." });
          } else res.json({ Message: "Assigned  successfully" });
        }
      );
    })
    .catch((err) => console.log(err));
});

/* Jobs requests */
router.post("/stafflist", (req, res) => {
  Staff.find().then((staff) => {
    if (!staff) {
      return res.status(404).json({ Message: "Staff not found!" });
    }
    res.json(staff);
  });
});

/* Payment to staff */
router.post("/payment", (req, res) => {
  const newPayment = new Payment({
    JobID: req.body.JobID,
    JobName: req.body.JobName,
    Amount: req.body.Amount,
    PaymentDate: Date(),
    StaffID: req.body.StaffID,
    StaffName: req.body.StaffName,
    Concern: "Staff",
  });
  newPayment
    .save()
    .then((payment) => {
      res.json(payment);
    })
    .catch((err) => console.log(err));
});

/* Jobs requests */
router.post("/attendance", (req, res) => {
  Attendance.find({}).then((payment) => {
    if (!payment) {
      return res.status(404).json({ Message: "Payment not found!" });
    }
    res.json(payment);
  });
});

/* Jobs requests */
router.post("/recievedlist", (req, res) => {
  Payment.find({ Concern: "Manager" }).then((payment) => {
    if (!payment) {
      return res.status(404).json({ Message: "Payment not found!" });
    }
    res.json(payment);
  });
});
module.exports = router;
