const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const Company = require("../models/company");
const Staff = require("../models/staff");
const Attendance = require("../models/attendance");
const JobRequest = require("../models/jobRequests");
const Payment = require("../models/payment");
const CurrentJob = require("../models/CurrentJobs");

/* Admin login route */
router.post("/clientlogin", (req, res) => {
  Admin.findOne({ Email: req.body.Email }).then((admin) => {
    if (!admin) {
      return res.status(404).json({ Message: "Admin not found!" });
    }
    if (admin.Password === req.body.Password) {
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
  JobRequest.find({ Concern: "Admin" }).then((request) => {
    if (!request) {
      res.status(404).json({ Message: "Requests not found!" });
    }
    res.json(request);
  });
});

/* Reject job */
router.post("/rejectjob", (req, res) => {
  JobRequest.updateOne(
    { _id: req.body.id },
    { Concern: "Client", Status: "Rejected", Reason: req.body.rejectMessage },
    function (err, r) {
      if (err) {
        res.json({ Message: "Request not found." });
      } else res.json({ Message: "Request rejected successfully" });
    }
  );
});

/* Assign job */
router.post("/assignjob", (req, res) => {
  console.log(req.body);
  JobRequest.updateOne(
    { _id: req.body.jobID },
    { Concern: "Manager" },
    function (err, response) {
      if (err) {
        res.json({ Message: err });
      } else res.json({ Message: "Request assigned successfully" });
    }
  );
});

/* Companies List */
router.post("/companieslist", (req, res) => {
  Company.find({}).then((request) => {
    if (!request) {
      res.status(404).json({ Message: "Requests not found!" });
    }
    res.json(request);
  });
});

/* Update company */
router.post("/updatecompany", (req, res) => {
  console.log(req.body);

  Company.update(
    { _id: req.body.ComapanyID },
    {
      Representative: req.body.Representative,
      Designation: req.body.Designation,
      Address: req.body.Address,
      Phone: req.body.Phone,
      CompanyName: req.body.CompanyName,
      Email: req.body.Email,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Compnay not found." });
      } else {
        console.log(r);
        res.json({ Message: "Company updated successfully" });
      }
    }
  );
});

/* Staff List */
router.post("/stafflist", (req, res) => {
  Staff.find().then((staff) => {
    if (!staff) {
      res.status(404).json({ Message: "Not found.!" });
    }
    res.json(staff);
  });
});

/* Update company */
router.post("/updatestaff", (req, res) => {
  Staff.updateOne(
    { _id: req.body.staffID },
    {
      Name: req.body.Name,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Specialisation: req.body.Specialisation,
      CurrentJob: req.body.CurrentJob,
      Days: req.body.Days,
      CheckIn: req.body.CheckIn,
      CheckOut: req.body.CheckOut,
    },
    function (err, r) {
      if (err) {
        return res.json({ Message: "Staff not found." });
      } else return res.json({ Message: "Staff updated successfully" });
    }
  );
});

/* Timesheet */
router.post("/timesheet", (req, res) => {
  CurrentJob.find().then((job) => {
    if (!job) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(job);
  });
});

/* Timesheet */
router.post("/attendance", (req, res) => {
  Attendance.find().then((job) => {
    if (!job) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(job);
  });
});

/* Recived payments */
router.post("/payments", (req, res) => {
  Payment.find({ Concern: "Admin" }).then((payment) => {
    if (!payment) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(payment);
  });
});

/* Assign payment */
router.post("/assignpayment", (req, res) => {
  Payment.updateOne({ _id: req.body.ID }, { Concern: "Manager" }, function (
    err,
    r
  ) {
    if (err) {
      return res.json({ Message: "Payment not found." });
    } else return res.json({ Message: "Payment assigned successfully" });
  });
});

module.exports = router;
