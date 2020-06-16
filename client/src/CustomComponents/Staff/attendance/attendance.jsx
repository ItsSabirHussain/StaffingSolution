import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: "",
      status: "checkin",
      jobs: [],
      jobName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    console.log("Current state is: " + JSON.stringify(this.state));
    alert("Current state is: " + JSON.stringify(this.state));
    e.preventDefault();
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/staff/currentjobs", {
        id: this.props.staff._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, jobs: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.state.jobs.map((job) => {
      if (job.JobID === this.state.jobID) {
        this.setState({ ...this.state, jobName: job.JobName });
      }
    });
    console.log(this.state.status);
    if (this.state.status === "checkin") {
      axios
        .post("http://localhost:4000/staff/checkinattendance", {
          jobID: this.state.jobID,
          staffID: this.props.staff._id,
          staffName: this.props.staff.Name,
          jobName: this.state.JobName,
        })
        .then((res) => {
          console.log(res.data);
          alert("Attendance submitted successfully. \n");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios
        .post("http://localhost:4000/staff/checkoutattendance", {
          staffID: this.props.staff._id,
          staffName: this.props.staff.Name,
          jobID: this.state.jobID,
          jobName: this.state.JobName,
        })
        .then((res) => {
          console.log(res.data);
          alert("Attendance submitted successfully. \n");
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={5}>
            <Widget title={<h4> Attendance</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="" md={2}>
                        JOB ID
                      </Label>

                      <Col lg={5}>
                        <Input
                          type="select"
                          id="jobid"
                          name="jobid"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              jobID: e.target.value,
                            });
                          }}
                        >
                          {this.state.jobs.map((job) => {
                            return <option>{job.JobID}</option>;
                          })}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="" md={2}>
                        Select Option
                      </Label>

                      <Col lg={5}>
                        <Input
                          type="select"
                          id="status"
                          name="status"
                          onChange={(e) => {
                            var options = e.target.options;
                            var value = "";
                            for (var i = 0, l = options.length; i < l; i++) {
                              if (options[i].selected) {
                                value = options[i].value;
                              }
                            }
                            this.setState({
                              ...this.state,
                              status: value,
                            });
                          }}
                        >
                          <option value="checkin">Check In</option>
                          <option value="checkout">Check Out</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Submit Attendance
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Attendance;
