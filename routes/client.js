const express = require("express");
const router = express.Router();

const Company = require("../models/company");
const JobRequest = require("../models/jobRequests");
const CurrentJobs = require("../models/CurrentJobs");
const Payment = require("../models/payment");
const Review = require("../models/reviews");

/* Client registration route */
router.post("/clientreg", (req, res) => {
  console.log(req.body);
  Company.findOne({ Email: req.body.Email }).then((company) => {
    if (company) {
      return res.status(400).json({ ID: "Company already exists." });
    } else {
      const newCompany = new Company({
        Representative: req.body.Representative,
        Designation: req.body.Designation,
        Address: req.body.Address,
        Phone: req.body.Phone,
        CompanyName: req.body.CompanyName,
        Email: req.body.Email,
        Password: req.body.Password,
      });
      newCompany
        .save()
        .then((company) => res.json(company))
        .catch((err) => console.log(err));
    }
    console.log(body);
  });
});
/* Client login route */
router.post("/clientlogin", (req, res) => {
  Company.findOne({ Email: req.body.Email }).then((company) => {
    if (!company) {
      res.status(404).json({ Message: "User not found!" });
    }
    console.log(company.Password);
    console.log(req.body.Password);

    if (company.Password === req.body.Password) {
      res.json({
        success: true,
        token: company.id,
      });
    } else {
      res.status(400).json({ keyincorrect: "Incorrect correct password" });
    }
  });
});
/* Client send request for job */
router.post("/sendrequest", (req, res) => {
  console.log(req.body);
  const newJobRequest = new JobRequest({
    Title: req.body.Title,
    Detail: req.body.Detail,
    RequiredStaff: req.body.RequiredStaff,
    RequiredDays: req.body.RequiredDays,
    RequiredTime: req.body.RequiredTime,
    ClientID: req.body.ClientID,
    CompanyName: req.body.companyName,
    Status: "Pending",
    Reason: "",
    Concern: "Admin",
    Date: Date(),
  });
  newJobRequest
    .save()
    .then((request) => res.json(request))
    .catch((err) => console.log(err));
});
/* Send job status */
router.post("/requeststatus", (req, res) => {
  JobRequest.find({ Concern: "Client", ClientID: req.body.ClientID }).then(
    (request) => {
      if (!request) {
        return res.status(404).json({ Message: "Request not found!" });
      }
      res.json(request);
    }
  );
});
/* Send job status */
router.post("/clientdashboard", (req, res) => {
  Company.findOne({ _id: req.body.id }).then((company) => {
    if (!company) {
      return res.status(404).json({ Message: "Company not found!" });
    }
    res.json(company);
  });
});

/* Delete job status */
router.post("/requestdelete", (req, res) => {
  JobRequest.remove({
    Concern: "Client",
    ClientID: req.body.ClientID,
    _id: req.body.id,
  }).then((request) => {
    if (!request) {
      return res.status(404).json({ Message: "Request not found!" });
    }
    res.json(request);
  });
});

/* Staff details */
router.post("/staffdetails", (req, res) => {
  CurrentJobs.find({ ClientID: req.body.ClientID }).then((job) => {
    if (!job) {
      return res.status(404).json({ Message: "Job not found!" });
    }
    res.json(job);
  });
});

/* Payment to admin */
router.post("/payment", (req, res) => {
  const newPayment = new Payment({
    JobID: req.body.JobID,
    JobName: req.body.JobName,
    Amount: req.body.Amount,
    PaymentDate: req.body.PaymentDate,
    ClientID: req.body.ClientID,
    ClientName: req.body.ClientName,
    Concern: "Admin",
    CardNumber: req.body.CardNumber,
    CVV: req.body.CVV,
  });
  newPayment
    .save()
    .then((request) => res.json(request))
    .catch((err) => console.log(err));
});

/* Review */
router.post("/sendReview", (req, res) => {
  const newReview = new Review({
    JobID: req.body.JobID,
    JobName: req.body.JobName,
    ClientID: req.body.ClientID,
    ClientName: req.body.ClientName,
    Message: req.body.Message,
    Email: req.body.Email,
    Phone: req.body.Phone,
  });
  newReview
    .save()
    .then((payment) => res.json(payment))
    .catch((err) => console.log(err));
});

module.exports = router;
